# AI Engineer Mission Control

Mission Control is a single viewport at normal desktop zoom (`100svh`, with a `100vh` fallback). Its stable grid gives about a third of the room to the eight-stop route and the rest to the experiment desk. The header, status strip and footer stay inside that height. Overview, selected, paused and running states use the same tracks; opening a station never expands the section.

The previous 60/40 layout and demo-only scale created a large empty route, tiny overview/brief text and oversized controls. They have been replaced with one shared, viewport-aware type scale. The desk has two columns: a readable concept brief with an input/output summary, and a framed hands-on experiment. Descriptions and demo outcomes use the same body size. The default mission briefing has the same hierarchy, with Prepare / Reason / Deliver and Pip's lab passport.

The eight steps are Data prep, Model, RAG, Agents, Guardrails, API, Deploy and Monitor. Model combines machine learning, transformer attention and LLM fine-tuning. All requests, model outputs and metrics are local illustrative examples, not a live deployment.

Trying an enabled experiment control earns one stamp for that station, retained for the current component session. Merely opening a station or watching the guided tour earns no stamp. The next-station action in the overview finds the first untried experiment. Stamps indicate interaction, not test correctness or proficiency. The run button tours the eight stations at four seconds per step; interacting with an experiment pauses the tour without clearing that experiment's local state. Pause/resume/reset, offscreen pausing and manual stepping for reduced motion remain intact.

Desktop uses eight equal columns. Tablets and phones use four columns by two rows. On phones the desk stacks vertically and scrolls within its allocation. Unusually short viewports and enlarged text can also scroll the desk internally; content remains reachable without making a second page-height section. The route labels remain visible on short screens even when machine artwork is hidden. Escape closes the desk and returns focus to its station; previous/next controls are keyboard accessible.

The hero's day/night toggle gently swings as one hanging object, including its cord and note. Its pivot sits at the top of the cord. Hover, keyboard focus and artwork loading pause the sway. Reduced motion and the site's Motion off setting disable it. The compact mobile toggle stays still.

Concept references: [LangChain semantic search](https://docs.langchain.com/oss/python/langchain/knowledge-base) describes documents, embeddings and retrieval used by RAG; [Hugging Face PEFT](https://huggingface.co/docs/peft/en/index) explains adapting pretrained models with a small number of parameters; [Kubernetes documentation](https://kubernetes.io/docs/home/) describes scheduling, scaling and managing containers. These inform the educational explanations, not the artwork.
