# Subramanian — AI Engineer Portfolio

A personal Next.js portfolio set in an illustrated anime world. Three generated scenes depict Subramanian on a rooftop, working at his desk, and looking toward the next horizon. A warm paper theme, handwritten accents and Pip the robot connect the chapters. Project covers use minimal animated SVG drawings, alongside technology logos, résumé download and profile chat.

## Run locally

Use Node.js 22 or newer and npm.

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
- `src/app/storybook.css`: the paper theme, cartoon details, responsive covers and animation styles.
- `src/components/scene-art.tsx`: scroll-driven image movement, leaves and paper edges.
- `src/components/chapter-trail.tsx`: scroll-driven cloud banks, a rising sun and Pip travelling on a paper plane between sections.
- `src/components/project-doodle.tsx`: minimal chat, map and notebook drawings. Animation pauses outside the viewport. Set a project's `image` to replace its drawing with a real screenshot later.
- `src/components/pip.tsx` and `tool-sticker.tsx`: the interactive mascot and technology cards that reveal a short explanation when selected.
- `public/art/`: three scene PNGs and optimized WebP versions used by the page, plus unused project-cover concepts. Only the three scene WebPs load; together they total about 870 KB.
- `design/ARTWORK.md`: image provenance, final asset paths and the exact generation prompts. Artwork was created with the built-in image tool using the supplied portrait as an identity reference.

The additional project list from the supplied biography was not substituted for the existing Full LLM Chat, Travel Planner and Agentic Writer entries. The assistant can also describe production experience documented in the résumé, such as LazyLoop, when asked.

## Check and build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

This now uses a Next.js server because `/api/chat` needs a server-side runtime. The old static-export configuration is removed; `out/` from an earlier build is not the current deployable site. Deploy on a host that supports Next.js route handlers. Public deployment has not been configured.

## Motion and accessibility

The landing type enters line by line, scenery moves with scroll, and leaves drift across the scenes. Section content rises and straightens as it enters the viewport; scrolling backward reverses the effect. Cloud banks separate while Pip flies across each chapter boundary. Each project has a small looping drawing, with offscreen animation paused. Project details use native disclosures. The footer Motion control disables CSS animation and scroll-driven effects; operating-system reduced-motion preferences are respected. Chat opens in a native modal dialog with keyboard focus containment, Escape dismissal and focus restoration. The chat and résumé download remain available on phones and tablets.

## Design references

The user's [automation portfolio](https://portfolio-subramanian-007.vercel.app/) informed the preference for a strong visual presence. Their supplied cinematic anime references then led to the current illustrated direction. The original project records and featured-plus-two layout are retained with a lighter cartoon treatment. Detailed generated project covers were replaced with minimal code-native drawings following the user's feedback. Technology logos come from Simple Icons.

API implementation follows the [official Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).
