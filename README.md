# Subramanian — AI Engineer Portfolio

**A curious mind. A world to build.**

An illustrated, interactive portfolio for Subramanian M, an AI engineer based in Coimbatore, India. Built with Next.js, it brings together AI engineering projects, a playful day/night world, a small portfolio assistant, and a hands-on tour of how AI systems work.

![Daytime rooftop illustration from the portfolio](public/art/anime-rooftop.webp)

## Inside the portfolio

- **Day and night scenes** — original anime illustrations, coordinated color transitions, drifting leaves in the daytime artwork, and subtle nighttime fireflies.
- **Pip, the portfolio guide** — a cartoon companion with section-aware comments and a chat interface for questions about Subramanian’s background, skills, and experience.
- **Pip’s Workshop** — a separate playful mission page with six interactive stations covering data preparation, models, retrieval, safe agent tools, APIs, deployment, and monitoring.
- **Project showcase** — a compact one-viewport idea garden with LazyChat as the completed feature and Travel Planner plus Agentic Writer as coming-soon experiments. LazyChat opens into a full illustrated technical case study.
- **About, stack, and contact** — technology icons, career background, social links, a downloadable résumé, and an illustrated field guide for navigation.
- **Responsive and accessible interactions** — a compact mobile hero and chat sheet, keyboard-friendly dialogs, reduced-motion support, and a manual animation control.
- **Deployment essentials** — optimized responsive images, generated social previews, canonical URL configuration, a sitemap, robots rules, and a matching 404 page.

## Tech stack

| Area      | Tools                                                                             |
| --------- | --------------------------------------------------------------------------------- |
| Framework | Next.js 16 App Router, React 19, TypeScript                                       |
| Styling   | Tailwind CSS 4, custom CSS, CSS Modules                                           |
| Motion    | Motion for React, CSS animations, SVG illustrations                               |
| Icons     | Lucide React, Simple Icons                                                        |
| Chat      | Next.js route handler, saved profile answers, optional OpenAI-compatible provider |
| Checks    | ESLint, TypeScript, Node.js test runner, production HTTP smoke checks             |

## Run locally

Use **Node.js 24** and npm. The minimum supported Node.js version is **22.18.0**; the recommended version is recorded in [.nvmrc](.nvmrc).

```sh
git clone https://github.com/subramanian252/ai-engineer-portfolio.git
cd ai-engineer-portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://127.0.0.1:3000). To use a different port:

```sh
npm run dev -- --port 3001
```

No API key is required to explore the portfolio or use saved profile answers.

## Configuration

Copy [.env.example](.env.example) to `.env.local` when configuring the deployment URL or enabling live Pip. Restart the development server after changing environment variables.

| Variable          | Purpose                                                                      |
| ----------------- | ---------------------------------------------------------------------------- |
| `SITE_URL`        | Final public origin, such as `https://your-domain.com`. Set before building. |
| `PIP_WEBHOOK_URL` | Server-only production n8n webhook used by Pip.                              |

Keep secrets on the server. Do not prefix API keys with `NEXT_PUBLIC_`. Local environment files are excluded from Git.

### How the chat works

Without `PIP_WEBHOOK_URL`, Pip uses **Profile answers**: keyword-based retrieval over the curated résumé and profile facts in [knowledge.ts](src/content/knowledge.ts). It answers the suggested questions and supported follow-ups, and acknowledges information that is missing.

With `PIP_WEBHOOK_URL`, `/api/chat` sends the latest user message and a browser-session identifier to n8n as `{ "message": "...", "pip_session_id": "..." }`. It reads the reply from `output.answer`. The webhook URL remains inside the server route and is never added to the browser bundle.

The chat loads on demand. Conversation history stays in memory for the current page and survives closing and reopening the chat. A generated `pip_session_id` lives in session storage for the browser tab; **New conversation** clears the visible chat and creates a fresh ID.

The endpoint validates message roles, length, conversation size, and session-ID shape, rejects cross-origin browser requests, and applies a request timeout. Configure hosting-level rate limits before publicly enabling the workflow.

## Pip’s Workshop

The `/workshop` route turns Mission Control into a small game. Visitors pick a
briefing, run the pipeline, open every machine, try its controls, and collect
six stamps in Pip’s lab passport. The control room explains six stages of an AI
system:

**Data prep → Model → RAG → Agents + guardrails → API → Deploy + monitor**

Mission Control stays inside one viewport on desktop. A six-stop route sits above a larger experiment desk, with compact substeps preserving permission checks and live monitoring without crowding the main route. Each station shows its input and output; trying its controls earns a stamp in Pip’s lab passport for the current visit. Smaller screens use a three-by-two route and let the section grow naturally. The home page keeps a compact invitation into the Workshop rather than embedding the entire game.

Experiments include cleaning duplicate rows, comparing training and validation loss, exploring attention and LoRA adapters, stepping through retrieval, selecting allowed agent tools, inspecting requests, and exercising a deployment test gate. **Run the system** guides visitors through every station, with pause, resume, and reset controls.

These are educational simulations. They do not train models, call external tools, deploy containers, or display live infrastructure metrics. Reduced-motion mode supports manual progression. See [the implementation notes](design/MISSION-CONTROL.md).

## Update the content

| Content                                 | Location                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Profile, contact links, project records | [src/content/portfolio.ts](src/content/portfolio.ts)                             |
| Chat knowledge and suggested questions  | [src/content/knowledge.ts](src/content/knowledge.ts)                             |
| Page sections and technology stack      | [src/app/page.tsx](src/app/page.tsx)                                             |
| Downloadable résumé                     | [public/subramanian-resume.pdf](public/subramanian-resume.pdf)                   |
| Day and night artwork                   | [public/art](public/art)                                                         |
| Mission Control stations                | [src/components/mission-control-data.ts](src/components/mission-control-data.ts) |

### Add a project

Edit the `projects` array in `src/content/portfolio.ts`. Each record contains an ID, title, category, summary, status, tags, and a visual type (`chat`, `travel`, or `writer`). A completed project can also provide a `caseStudyUrl` for an internal story page.

When a project is ready, set its status to `completed` and add its real `demoUrl` and/or `repositoryUrl`. An optional `image` path replaces the illustrated cover with a screenshot. Keep unfinished projects marked `coming-soon` and update the chat knowledge when adding new project facts.

### Artwork and motion

The day scenes use `anime-rooftop.webp`, `anime-workshop.webp`, and `anime-horizon.webp`. The matching night scenes use `hero.png`, `mid.png`, and `end.png`. Next.js serves responsive optimized versions; the original artwork stays intact.

Pip, project covers, clouds, and paper-plane transitions use SVG and CSS. Animations respect system reduced-motion preferences and the footer’s **Motion** control. Artwork provenance and design references are in [ARTWORK.md](design/ARTWORK.md) and [INSPIRATION.md](design/INSPIRATION.md).

## Checks and production build

```sh
npm run check
npm start
```

`check` runs lint, automated tests, and a production build. Individual commands are also available:

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run lint`      | ESLint checks                                   |
| `npm run typecheck` | TypeScript checks                               |
| `npm run test`      | Pipeline state-machine and deployment URL tests |
| `npm run build`     | Optimized production build                      |
| `npm start`         | Production server; respects `PORT`              |
| `npm run format`    | Format source and configuration files           |

In a second terminal, verify the running production server:

```sh
npm run smoke -- http://127.0.0.1:3000
```

The smoke check verifies page sections and navigation, the six stations, résumé download, social preview dimensions, optimized night images, robots and sitemap routes, the 404 page, and chat validation and saved answers. It skips paid model calls when live AI is configured. Complete a browser review of desktop, mobile, theme switching, and keyboard interactions before a public launch; HTTP checks do not replace visual testing.

## Deploy

Use a host that supports **Next.js server rendering and route handlers**, such as Vercel or a Node.js server. Static export hosting does not support the chat endpoint or the image optimizer.

1. Connect this repository and select the `main` branch.
2. Use Node.js 24, `npm ci` to install, and `npm run build` to build. On a self-hosted Node server, start with `npm start`; managed Next.js platforms handle startup.
3. Set `SITE_URL` to the final HTTPS origin before building, with no path, query, or fragment. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically if `SITE_URL` is blank.
4. Set `PIP_WEBHOOK_URL` to enable live Pip, or leave it unset to use saved profile answers.
5. Run `npm run smoke -- https://your-domain.com` against the deployed site.

Canonical URLs and sitemap entries are omitted until a production origin is configured. Social previews are generated at `/opengraph-image`; crawl configuration is available at `/robots.txt` and `/sitemap.xml`. Vercel preview deployments are marked `noindex`.

## Connect

[GitHub](https://github.com/subramanian252) · [LinkedIn](https://www.linkedin.com/in/subramanian-m-9aa117227/) · [Fiverr](https://www.fiverr.com/subramanian007) · [Email](mailto:suryasubramanian252@gmail.com)
