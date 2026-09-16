# Illustrated portfolio: current direction

The original daytime rooftop portrait remains unchanged, together with the workshop scene, horizon scene, Pip in the project section, Pip in chat and Pip riding the paper plane between sections. The original hero headline is restored.

Night mode uses midnight indigo backgrounds, smoky plum surfaces, muted teal secondary surfaces and lilac ink throughout the site. The user-supplied night illustrations are used in the hero, About and closing sections. The original daytime assets remain unchanged.

## Night illustrations and ambient movement

- `public/art/hero.png`: empty moonlit rooftop landscape in the hero.
- `public/art/mid.png`: nighttime workshop in About.
- `public/art/end.png`: moonlit valley in the closing scene.

Fireflies move continuously across section boundaries in a pointer-transparent layer. Their slow looping paths and staggered glow are CSS-only. Daytime leaves are confined to the hero and closing illustrations; the global daytime particle layer has been removed. Nighttime has nine fireflies, reduced to four on phones. There are fewer lights on phones; reduced motion and the footer motion control hide them, background tabs pause them, and open dialogs fade them out.

The day and night images remain mounted in a shared frame and crossfade, with image decoding completed before the first switch. Separate gradient overlays and synchronized ink/surface transitions prevent abrupt jumps.

## Interaction references

- [Bruno Simon](https://bruno-simon.com/): make the portfolio a place to explore. Applied through an illustrated map of portfolio sections.
- [ITom](https://itomdev.com/): sketch-like spaces turn navigation into discovery. Applied through map landmarks, hand-drawn labels and a folding-paper entrance.

These informed interaction principles only. No layouts, code or artwork were copied. The map and supporting drawings are original SVG and CSS.

The native map and chat dialogs support keyboard focus containment and Escape. The footer motion switch and operating-system reduced-motion preferences disable motion. The original project records remain unchanged, with minimal animated covers.
