import { knowledge } from "../content/knowledge";

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatAnswer = {
  answer: string;
  mode: "profile" | "ai";
  sources: string[];
};

const normalize = (text: string) =>
  text.toLowerCase().replace(/[’']/g, "").replace(/[-–]/g, " ");

export function answerFromProfile(messages: ChatMessage[]): ChatAnswer {
  const question = normalize(messages.at(-1)?.content ?? "");
  if (/^(hi|hello|hey|hello there|hi there)[!.\s]*$/.test(question)) {
    return {
      answer:
        "Hi! I can help you explore Subramanian’s background, technical skills, experience and career interests. What would you like to know?",
      mode: "profile",
      sources: ["Profile"],
    };
  }
  if (
    /\b(salary|notice period|married|age|birthday|visa|work authorization|address|phone|religion)\b/.test(
      question,
    )
  ) {
    return {
      answer:
        "That detail isn’t included in the public profile used by this assistant. You can ask Subramanian directly at suryasubramanian252@gmail.com.",
      mode: "profile",
      sources: ["Profile"],
    };
  }
  let query = question;
  if (/years.*experience|how long.*(work|experience)/.test(question)) {
    return {
      answer:
        "Subramanian has 5+ years of remote freelance client experience, beginning with video editing in 2020. He moved into software development around 2022 and later into AI engineering. His profile does not state a separate number of years of professional AI employment.",
      mode: "profile",
      sources: ["Profile & résumé"],
    };
  }
  if (
    /what model|which model|are you (an? )?(ai|bot)|how does this chat/.test(
      question,
    )
  ) {
    return {
      answer:
        "I’m currently using saved profile information, not a live language model. I can find answers about Subramanian’s skills, experience, education and career interests. If a detail isn’t provided, I’ll say so.",
      mode: "profile",
      sources: ["Profile"],
    };
  }
  if (
    /^(and |what else|tell me more|more detail|can you elaborate|how so)/.test(
      question,
    )
  ) {
    const previous = messages.slice(0, -1).findLast((m) => m.role === "user");
    if (previous) query += " " + normalize(previous.content);
  }
  const words = query.match(/[a-z0-9]+/g) ?? [];
  const ranked = knowledge
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce(
        (score, keyword) =>
          score +
          (keyword.includes(" ")
            ? query.includes(keyword)
              ? 3
              : 0
            : words.some((word) => word.startsWith(keyword))
              ? 1
              : 0),
        0,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length)
    return {
      answer:
        "I don’t have enough information in Subramanian’s profile to answer that reliably. I can help with his technical skills, AI experience, freelance background, education, current learning or career interests. For anything else, you can reach him at suryasubramanian252@gmail.com.",
      mode: "profile",
      sources: ["Profile"],
    };
  const selected = ranked.slice(0, /\band\b|\balso\b/.test(question) ? 2 : 1);
  return {
    answer: selected.map((item) => item.entry.text).join("\n\n"),
    mode: "profile",
    sources: [...new Set(selected.map((item) => item.entry.source))],
  };
}
