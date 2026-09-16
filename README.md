# Subramanian — AI Engineer Portfolio

A personal Next.js portfolio set in an illustrated anime world. The original daytime rooftop portrait, workshop artwork and Pip mascot are preserved. A warm paper theme, handwritten accents, minimal animated project covers, illustrated chapter map, technology logos, resume download and profile chat connect the page.

Night mode uses midnight indigo, smoky plum and lilac, with the user-supplied `hero.png`, `mid.png` and `end.png` in the matching sections. Original daytime artwork stays intact. Nine warm fireflies drift across the page at night. Daytime leaves appear only inside the hero and closing artwork. See [the design notes](design/INSPIRATION.md).
On phones, the hero is a compact cover with the original artwork framed between the headline and introduction. Pip opens a small bottom sheet with four short prompts. The composer follows the visible viewport when the keyboard opens. Desktop layouts retain their existing presentation.

## Run locally

Use Node.js 24 (see `.nvmrc`) and npm. The minimum supported version is 22.18.0.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000.

## Chat

The chat works immediately in **Profile answers** mode. This is a local, keyword-based search over the owner-supplied profile and résumé facts, not an LLM. Its mode is visible in the interface. It handles the suggested questions, topic follow-ups, and missing information without claiming unknown details.

To enable live AI, copy `.env.example` to `.env.local` and add a server-side key:

```dotenv
OPENAI_API_KEY=your-key-here
CHAT_MODEL=gpt-4.1-mini
```

For another OpenAI-compatible provider, configure `CHAT_API_KEY`, `CHAT_BASE_URL` (ending in `/v1`), and `CHAT_MODEL`. The provider must support Chat Completions and `max_completion_tokens`. Keys are never included in client components. Restart the dev server after changing environment settings.

The server sends the conversation and curated public résumé/profile facts to the configured provider. It does not upload the PDF itself. Conversations live in the current browser page's memory and clear on reload or New conversation; no database or analytics is included. A provider error or timeout returns a clearly labeled profile answer. Free-form generative answers require a valid provider configuration; they have not been live-tested without a key.

The endpoint accepts only user/assistant messages, limits message count and length, and rejects cross-origin browser requests. This is a local portfolio implementation. Before public deployment with a paid key, configure hosting-level rate limits and provider spending limits.

## Content

- `src/content/portfolio.ts`: personal information, socials and the three original coming-soon projects. Add/reorder records to change the project list. Set `status` to `completed` and supply real `demoUrl`/`repositoryUrl` values when a project is ready.
- `src/content/knowledge.ts`: public résumé and profile facts used by both chat modes. Update this alongside your résumé to keep answers current. Learning areas are distinguished from established experience.
- `public/subramanian-resume.pdf`: an exact copy of the supplied résumé. All download buttons point to this PDF and use a readable download filename.
- `src/app/page.tsx`: the skills, career summary and education shown on the page.
- `src/app/anime.css`: the illustrated theme and responsive scene layouts.
- `src/app/journal.css`: the fold-out map and paper chat styles.
- `src/components/ambient-fireflies.tsx` and `src/app/fireflies.css`: 9 nighttime fireflies (4 on phones), hidden for reduced motion and Motion off, paused in background tabs and faded while dialogs are open. Daytime leaves stay inside the hero and closing artwork.
- `src/app/theme-transitions.css`: persistent artwork layers, synchronized palette fades and the sun/moon icon transition. Night artwork is decoded before the first switch using the same optimized responsive images that appear on screen.
- `src/app/mobile.css`: phone hero composition, compact chat launcher and chat sheet.
- `src/app/after-hours.css`: the full-site dark palette and nighttime artwork treatment.
- `src/components/field-guide.tsx` and `living-hero.tsx`: chapter navigation, theme switching, original daytime artwork and the night landscape slot.
- `src/app/storybook.css`: the paper theme, cartoon details, responsive covers and animation styles.
- `src/components/scene-art.tsx`: scroll-driven image movement, leaves and paper edges.
- `src/components/chapter-trail.tsx`: scroll-driven cloud banks, a rising sun and a travelling paper plane between sections.
- `src/components/project-doodle.tsx`: minimal chat, map and notebook drawings. Animation pauses outside the viewport. Set a project's `image` to replace its drawing with a real screenshot later.
- `src/components/pip.tsx` and `tool-sticker.tsx`: the interactive mascot and technology cards that reveal a short explanation when selected.
- `public/art/`: three scene PNGs and optimized WebP versions used by the page, plus unused project-cover concepts. The original rooftop WebP is the daytime hero. Workshop and horizon illustrations remain in their original sections.
- `design/ARTWORK.md`: image provenance, final asset paths and the exact generation prompts. Artwork was created with the built-in image tool using the supplied portrait as an identity reference.

The additional project list from the supplied biography was not substituted for the existing Full LLM Chat, Travel Planner and Agentic Writer entries. The assistant can also describe production experience documented in the résumé, such as LazyLoop, when asked.

## Check and build

```sh
npm run check
npm start
# In a second terminal, check the running production server:
npm run smoke -- http://127.0.0.1:3000
```

This now uses a Next.js server because `/api/chat` needs a server-side runtime. The old static-export configuration is removed; `out/` from an earlier build is not the current deployable site. Deploy on a host that supports Next.js route handlers. The production start command listens on the host network interface and respects `PORT`. Public hosting has not been published yet.

## Motion and accessibility

The landing type enters line by line, scenery moves with scroll, and leaves drift across the scenes. Section content rises and straightens as it enters the viewport; scrolling backward reverses the effect. Cloud banks separate while a paper plane flies across each chapter boundary. Each project has a small looping drawing, with offscreen animation paused. Project details use native disclosures. The footer Motion control disables CSS animation and scroll-driven effects; operating-system reduced-motion preferences are respected. Chat opens in a native modal dialog with keyboard focus containment, Escape dismissal and focus restoration. The chat and résumé download remain available on phones and tablets.

## Design references

The user's [automation portfolio](https://portfolio-subramanian-007.vercel.app/) informed the preference for a strong visual presence. Their supplied cinematic anime references then led to the current illustrated direction. The original project records and featured-plus-two layout are retained with a lighter cartoon treatment. Detailed generated project covers were replaced with minimal code-native drawings following the user's feedback. Technology logos come from Simple Icons.

API implementation follows the [official Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).

Pip is also the floating chat launcher: a small companion with a dismissible, section-aware comment. Project comments reflect the current coming-soon status. Mobile uses a smaller character and bubble; tapping Pip opens the existing chat. Motion preferences apply to his animations.

## AI Engineer Mission Control

A single-viewport 2D control room between Stack and Contact. Eight left-to-right steps cover Data prep → Model → RAG → Agents → Guardrails → API → Deploy → Monitor. Model groups training, transformer attention and fine-tuning into small experiment tabs. Roughly 60% of the screen holds the pipeline and 40% holds a stable lower panel: a compact system overview initially, or the selected station’s interactive explanation. Selecting or closing a station does not move the pipeline. Smaller screens show all eight stations in a four-by-two arrangement without a horizontal carousel; optional details can scroll inside the lower panel on constrained screens. Run/pause/resume/reset and reduced-motion manual stepping remain available.

All requests, metrics, attention weights and model outputs in this section are illustrative local examples. No model training, network tool calls or deployment occurs. The tour explains that real training and deployment precede serving, and security/evaluation apply across boundaries.

Implementation: `mission-control.tsx`, `mission-control-data.ts`, `mission-machines.tsx`, `mission-experiments.tsx`, and `src/app/mission-control.css`. State-machine checks: `node --test tests/mission-control.test.mjs`.

## Deployment checkpoint

The `main` branch checkpoint **before adding projects** includes the complete portfolio with three clearly labeled coming-soon projects. The daytime and user-supplied nighttime illustrations remain unchanged. Next.js now serves responsive optimized images, and the profile chat loads only when opened; closing and reopening it preserves the conversation for the current page.

### Hosting settings

- Framework: Next.js, Node.js 24.
- Install: `npm ci`. Build: `npm run build`. Start on a Node host: `npm start`. A managed Next.js host handles the start command itself.
- Set `SITE_URL` to the final HTTPS origin, with no path (for example `https://your-domain.com`), **before building**. On Vercel, its `VERCEL_PROJECT_PRODUCTION_URL` is used automatically when `SITE_URL` is blank. Canonical and sitemap entries are intentionally omitted until an origin exists.
- The illustrated social preview is generated at `/opengraph-image`; robots and sitemap are available at `/robots.txt` and `/sitemap.xml`. Vercel preview deployments are marked noindex.
- Chat needs no environment variables for saved profile answers. Add a server-side provider key only when you want live AI; configure provider spending and hosting rate limits at that point. Never use a `NEXT_PUBLIC_` prefix for a secret.
- After deployment, run `npm run smoke -- https://your-domain.com`. The smoke check skips paid model calls if live AI is configured.

`npm run check` runs lint, the interaction/configuration tests, and a production build. The smoke check covers navigation anchors, the eight stations, résumé download, the social card, optimized night images, the 404 page and chat request/answer behavior. Desktop/mobile visual review should also be completed before public launch; automated browser access was unavailable during this checkpoint.
