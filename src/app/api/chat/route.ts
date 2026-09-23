import { answerFromProfile, type ChatMessage } from "@/lib/profile-answers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

function webhookUrl() {
  const value = process.env.PIP_WEBHOOK_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export function GET() {
  return Response.json(
    { mode: webhookUrl() ? "live" : "profile" },
    { headers },
  );
}

export async function POST(request: Request) {
  // Next.js may normalize request.url to its internal hostname. The browser's
  // Host header retains the actual public origin and cannot be changed by JS.
  const origin = request.headers.get("origin");
  const expectedHost = request.headers.get("host") || new URL(request.url).host;
  let allowedOrigin = !origin;
  try {
    if (origin) allowedOrigin = new URL(origin).host === expectedHost;
  } catch {
    allowedOrigin = false;
  }
  if (!allowedOrigin) {
    return Response.json(
      { error: "This chat accepts requests from this portfolio only." },
      { status: 403, headers },
    );
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 24_000)
      return Response.json(
        { error: "Please start a new conversation." },
        { status: 413, headers },
      );
    raw = JSON.parse(body);
  } catch {
    return Response.json(
      { error: "Please send a valid message." },
      { status: 400, headers },
    );
  }

  const payload = raw as {
    messages?: unknown;
    pip_session_id?: unknown;
  } | null;
  const messages = payload?.messages;
  const pipSessionId = payload?.pip_session_id;
  if (
    !Array.isArray(messages) ||
    !messages.length ||
    messages.length > 12 ||
    messages.some(
      (message) =>
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        !message.content.trim() ||
        message.content.length > 2_000,
    ) ||
    messages.at(-1)?.role !== "user"
  ) {
    return Response.json(
      { error: "Use a message of up to 2,000 characters." },
      { status: 400, headers },
    );
  }
  if (
    typeof pipSessionId !== "string" ||
    !/^[A-Za-z0-9_-]{16,128}$/.test(pipSessionId)
  ) {
    return Response.json(
      { error: "Please start a fresh Pip session." },
      { status: 400, headers },
    );
  }

  const conversation: ChatMessage[] = messages.map((message) => ({
    role: message.role,
    content: message.content.trim(),
  }));
  const endpoint = webhookUrl();
  if (!endpoint) {
    return Response.json(
      {
        ...answerFromProfile(conversation),
        mode: "profile",
        notice: "Pip’s live webhook is not configured yet.",
      },
      { headers },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(25_000)]),
      body: JSON.stringify({
        message: conversation.at(-1)?.content,
        pip_session_id: pipSessionId,
      }),
    });
    if (!response.ok) throw new Error("Webhook unavailable");

    const result = (await response.json()) as {
      output?: { answer?: unknown };
    };
    const answer = result.output?.answer;
    if (typeof answer !== "string" || !answer.trim())
      throw new Error("Empty response");

    return Response.json(
      {
        answer: answer.trim(),
        mode: "live",
        sources: ["Pip’s live knowledge base"],
      },
      { headers },
    );
  } catch {
    return Response.json(
      { error: "Pip’s live connection is taking a nap. Please try again." },
      { status: 502, headers },
    );
  }
}
