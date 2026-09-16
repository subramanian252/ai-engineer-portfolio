# AI Engineer Mission Control

Mission Control occupies one viewport at desktop zoom. The header and eight-step left-to-right pipeline occupy approximately the upper 60%; the lower workbench and footer occupy approximately 40%. The same grid tracks apply in overview, selected, paused and running states, preventing the pipeline from moving during interaction.

The eight steps are Data prep, Model, RAG, Agents, Guardrails, API, Deploy and Monitor. Model combines machine learning, transformer attention and LLM fine-tuning with compact experiment switches. Cartoon outlines, small machine illustrations, short readable labels and directional connectors remain; the former two-level room and serpentine route have been removed.

The lower region begins with a compact system overview. Selecting a step replaces it with a concise explanation and an interactive visual. Closing the explanation restores the overview and returns focus to its station. The run button steps through all eight stations; pause/resume/reset, offscreen pausing and manual stepping for reduced motion remain intact.

Desktop uses eight equal minmax(0, 1fr) columns. Tablets and phones use four columns by two rows, with no horizontal scrolling. The section remains viewport-bounded; unusually short viewports, increased text size and mobile screens can scroll the optional lower detail content within its allocation instead of growing the page or clipping controls. All requests, model outputs and metrics remain local illustrative examples.

Concept references: [LangChain semantic search](https://docs.langchain.com/oss/python/langchain/knowledge-base) describes documents, embeddings and retrieval used by RAG; [Hugging Face PEFT](https://huggingface.co/docs/peft/en/index) explains adapting pretrained models with a small number of parameters; [Kubernetes documentation](https://kubernetes.io/docs/home/) describes scheduling, scaling and managing containers. These inform the educational explanations, not the artwork.
