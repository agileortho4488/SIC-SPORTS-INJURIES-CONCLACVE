---
name: HSC 2027 — Hyderabad Sports Injuries Conclave
description: Ink ground, one orange voice, Barlow Condensed shouting over Barlow speaking.
colors:
  ink: "#0A1424"
  navy: "#1C2E4A"
  navy-deep: "#060E1A"
  night: "#1B3B59"
  fjord: "#425E7B"
  slate: "#708090"
  accent: "#FF5A1F"
  accent-display: "#D9480F"
  accent-ink: "#A8350D"
  accent-2: "#FF8A4C"
  paper: "#FFFFFF"
  mist: "#C6CCD6"
  mute: "#BDC3C7"
  silver: "#E5E5E5"
typography:
  poster:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "258px"
    fontWeight: 700
    lineHeight: 0.74
    letterSpacing: "-0.01em"
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.1rem, 4.8vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.8rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 3.4vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.02em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.4vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.22em"
rounded:
  none: "0"
  control: "10px"
  card: "14px"
  band: "18px"
  pill: "99px"
spacing:
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "1.75rem"
  gutter: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4.5rem, 11vh, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7em 1.7em"
  button-primary-hover:
    backgroundColor: "{colors.accent-display}"
    textColor: "{colors.ink}"
  button-inverse:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.7em 1.7em"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.7em 1.7em"
  card:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "1.5rem 1.75rem"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.6em 1.4em"
  input:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1rem"
  poster-sheet:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "1080px"
    height: "1350px"
---

# Design System: HSC 2027 — Hyderabad Sports Injuries Conclave

## Overview

**Creative North Star: "Floodlight on a Night Field"**

Everything in this identity happens on a dark ground, and one warm light picks out the thing that matters. The ground is the brand ink, never neutral grey; the light is a single orange. Nothing else glows. That is the whole system, and every surface — the website, the printed brochure, the badge, the save-the-date sheet — is a different distance from the same floodlit field.

The density is editorial rather than brochure-like: large uppercase Barlow Condensed carrying names, numbers and dates, and Barlow doing all the actual talking underneath it in small, widely-tracked lines. Surfaces are built from hairline borders over tinted navy, not from drop shadows; depth comes from tone and from a 1px edge, and movement is short and firm (120ms press, 200ms state change) rather than bouncy. Photography is real — athletes, not illustration. The organiser has rejected AI-generated decorative artwork for this project and that rejection is binding on every future surface.

The one tension the system carries deliberately: the website leans dense (numbered sections, stat cards, chips, a countdown band), while circulating material leans austere. The 2027 save-the-date resolves that tension by stripping the panel vocabulary out entirely — see **The Edge-Not-Box Departure** under Shapes. Both are the same world; they differ in how much of it is spoken aloud.

**Key Characteristics:**
- Dark ground always; light grounds exist only in print and switch to the ink-safe accent.
- Exactly one accent, used sparingly enough that it still reads as a signal.
- Barlow Condensed shouts, Barlow speaks; neither does the other's job.
- Hairline borders on tinted navy instead of elevation.
- Real photography, never generated decoration.
- Built to be inherited: swap the year, the system still holds.

## Colors

A cold navy field with a single warm accent, plus a narrow grey ladder for text.

### Primary
- **Conclave Orange** (`#FF5A1F`): the only accent, taken from the HSC mark. Dates, section numbers, the active nav underline, the primary pill, link colour, focus ring, the 2027 chip in the lockup, and the one full-bleed register band. On the ink it measures 5.9:1 — it is a text colour there, not just a fill.
- **Display Orange** (`#D9480F`): the darker accent, used two ways — the hover state of the primary pill on dark ground (`--accent-dim` is `#CC4618`), and large display type on white paper (`--accent-display`), where it reaches 4.3:1 and clears the large-text threshold.
- **Ink-Safe Orange** (`#A8350D`): the print accent. Any accent body text or small label on a white ground uses this (6.6:1). Non-negotiable; see the named rule.

### Secondary
- **Signal Orange** (`#FF8A4C`): a reserved signal colour, not a second brand accent. It appears only on the hero flight captions and on draft/provisional strips (`.draft-strip`, `.draftmark`). It means "this is scaffolding", so it is never used decoratively.

### Neutral
- **Ink** (`#000000`): the website's body ground. The deepest surface in the system.
- **Conclave Ink** (`#0A1424`): the ground the reverse lockup is drawn on, and the page background. `#1C2E4A` is the one step up from it — card fills, raised surfaces, borders, the print cover ground.
- **Deep Navy** (`#0D1628`): the bottom of the save-the-date's vertical gradient; used where a navy field needs to darken toward an edge without going to black.
- **Night** (`#1B3B59`) and **Fjord** (`#425E7B`): gradient partners and hairline border colours, almost always at low alpha (0.3–0.5) rather than solid.
- **Slate** (`#708090`): quiet UI strokes and "to be announced" text.
- **Mist** (`#C6CCD6`) and **Ash** (`#BDC3C7`): secondary text on dark grounds (8.9:1 and 9.3:1 on navy). Ash is the website's `--mute`; Mist is the poster's.
- **Paper** (`#FFFFFF`) and **Silver** (`#E5E5E5`): primary text on dark, and hairline rules on light print pages.

### Named Rules
**The One Light Rule.** There is one accent on any surface, and it marks the single thing the reader must leave with. On the save-the-date that is the date — the accent appears on the numerals, on the year in the title, and on the 3px edge that splits the sheet, and nowhere else. The mark in the corner is the one exception, because it is the logo, not a highlight.

**The Ink-Safe Accent Rule.** `#FF5A1F` on white measures 3.1:1 and is never used for running text on a light ground. Small text and labels on white take `#A8350D` (6.6:1); display type at 24pt or larger may take `#D9480F` (4.3:1). The full accent on white is permitted only as a fill (a rule, a band, a border), never as ink.

**The Signal Orange Is A Warning Rule.** `#FF8A4C` means provisional. If a surface is final, it has none on it.

## Typography

**Display Font:** Barlow Condensed (fallback Arial Narrow, sans-serif) — self-hosted, `fonts/barlow-condensed-700.woff2`. One 700 face, declared across the `400 700` range so the display rules that still say `font-weight: 400` render in the real bold rather than a synthesised one.
**Body Font:** Barlow (fallback system-ui, sans-serif) — self-hosted, `fonts/barlow-400.woff2`, `-500`, `-600`.

**Character:** A condensed all-caps display face with no lowercase ambitions, set against a neutral grotesque that stays comfortable at 11px. The pairing reads sporting rather than academic — scoreboard above, programme note below.

### Hierarchy
- **Poster** (400, 98–258px, line-height 0.74–0.86): save-the-date scale only. The date numerals at 258px and the conclave name at 98px. Letter-spacing goes to zero or slightly negative here; tracking that helps at 12px hurts at 258px.
- **Display** (400, `clamp(2.1rem, 4.8vw, 3.8rem)`, 1.04, 0.03em, uppercase): section headings across the site (`.display`).
- **Headline** (400, `clamp(2.6rem, 7vw, 5.8rem)`, 1.02, uppercase): page and hero H1 only, one per page.
- **Title** (700, `clamp(1.5rem, 3.4vw, 2.7rem)`, 1.25, uppercase): mission quotes and pull statements set in Barlow Condensed as a block.
- **Body** (400, `clamp(1rem, 1.4vw, 1.15rem)`, 1.65): all running prose. Measure is held by the 76rem container and by explicit `max-width` on long copy (52–62rem).
- **Label** (600, 11–13px, 0.16–0.24em, uppercase): table headers, form labels, meta rows and breadcrumbs. The accent on dark, ink-safe orange on light, mute grey when it is a breadcrumb rather than a signal.

### Named Rules
**The Two-Voice Rule.** Barlow Condensed carries names, numbers, dates and single-line shouts. Barlow carries anything that is a sentence. A paragraph never goes in the condensed face, and a date never goes in the text face.

**The Inverse Tracking Rule.** Tracking moves opposite to size. Small uppercase Barlow takes 0.14–0.24em; Barlow Condensed at display scale takes 0.02–0.03em; at poster scale it takes 0 to −0.01em. Uniform tracking across the ramp is a defect.

## Layout

The website is a single centred column: `--container: 76rem` with a fluid gutter of `clamp(1.25rem, 4vw, 3rem)`, sections breathing at `clamp(4.5rem, 11vh, 8rem)` of block padding, and a fixed 4.25rem navigation bar that every page offsets against (`calc(var(--nav-h) + …)`). Internal structure is grid, not flex-wrap: an asymmetric `1.1fr 1fr` about-grid, a `minmax(16rem, 1fr) 1.6fr` split with a sticky left rail, and `repeat(auto-fit, minmax(…, 1fr))` for card sets so they collapse without breakpoint-by-breakpoint rules.

Only two layout breakpoints exist — 60rem and 44rem — and most responsive behaviour is handled by `clamp()` and auto-fit grids instead. Two capability queries do real work: `(hover: hover) and (pointer: fine)` gates every hover state so a tap does not strand an element in hover, and `prefers-reduced-motion` drops movement while deliberately keeping colour and opacity transitions alive.

Circulating artefacts are fixed canvases, not responsive pages: the save-the-date is one 1080×1350 sheet (4:5, the aspect a phone chat thread gives most room to), the brochure is A4 at 16mm margins. These are rendered to PNG/PDF from HTML, so their layout is a one-shot composition rather than a flow.

### Named Rules
**The Thumbnail Test.** Anything that circulates is judged at roughly 240px wide in a chat list before it is judged at full size. If the name and the date are not readable there, the composition is wrong — not the font size.

## Elevation & Depth

This system is flat by default and builds depth from tone and hairlines, not from shadow. A raised surface is `#1C2E4A` sitting on the ink, outlined with a 1px border at `rgb(66 94 123 / 0.35)` — fjord at low alpha, so the edge reads as a lit rim rather than a drawn line. Tonal bands (`.tint-band`, `.mission-band`) separate major regions with gradients that fade to transparent at both ends, so no band ever has a hard horizontal seam.

Shadows exist, but only as a response: an accent glow under the primary pill on hover, a black lift under the countdown band, and a drop under elements that genuinely float above the page. At rest, nothing in the system casts a shadow.

### Shadow Vocabulary
- **Accent hover glow** (`box-shadow: 0 8px 24px rgb(255 90 31 / 0.25)`): the primary pill on hover, fine pointers only.
- **Dark hover lift** (`box-shadow: 0 8px 24px rgb(0 0 0 / 0.35)`): the inverse pill.
- **Band lift** (`box-shadow: 0 8px 32px rgb(0 0 0 / 0.35), inset 0 1px 0 rgb(255 255 255 / 0.06)`): the countdown band — the inset top highlight is what makes it read as a slab.
- **Floating panel** (`box-shadow: 0 24px 48px rgb(0 0 0 / 0.5)`): the mobile nav sheet, the one element that genuinely sits above the page.

### Named Rules
**The Border-Not-Shadow Rule.** To raise a surface, change its tone and give it a 1px fjord hairline. Reach for a shadow only when the element is responding to the pointer or is literally overlaying the page.

## Shapes

Rounding is restrained and grouped: 14px on cards and panels, 99px on pills and chips, 10px on controls (inputs, the nav toggle, the top of a hovered list row), 18px on the one countdown slab, 50% on avatars and dots. Nothing else. Borders are always 1px (1.5px for the avatar ring and stroked numerals), and the system's recurring stroke trick is outlined type: section numbers and hero beat-words set in Barlow Condensed with `color: transparent` and a `-webkit-text-stroke` in the accent or fjord.

The other recurring form is the **slash** — a thin accent rule at a slight angle (`--slash-angle: -6deg` on the hero, `skewY(-2deg)` in print) that acts as a divider and a signature at once. It is a rule, never a shape with area.

### Named Rules
**The Four Radii Rule.** 10px controls, 14px cards, 99px pills, 50% circles. A new radius value is a design decision, not a tweak.

**The Edge-Not-Box Departure.** The save-the-date drops the card and panel vocabulary entirely: zero radius, no borders, no shadows, nothing floating — two fields split by a single 3px accent edge. This is a deliberate departure for circulating artefacts, where panel chrome reads as clutter at thumbnail size. It does not retire the site's panel language, and it does not license removing borders from site cards.

## Components

### Buttons
- **Shape:** fully rounded (99px), horizontal padding roughly 2.4× the vertical (`0.7em 1.7em`), label typography at 13px / 600 / 0.14em uppercase.
- **Primary (`.pill`):** accent fill, ink text (5.9:1). Hover darkens to `--accent-dim` and adds the accent glow; press scales to 0.97.
- **Inverse (`.pill-inverse`):** ink fill, white text — used on the accent register band, where an accent pill would disappear.
- **Ghost (`.ghost`):** 1px slate border, white text, transparent fill. Hover moves the border to the accent and tints the fill with `#1C2E4A` at 0.5 alpha.
- **Behaviour:** transitions are declared on the independent `translate` / `scale` properties rather than `transform`, because the magnetic hover handler writes an inline `transform` that a CSS `transform` would lose to. Press feedback (120ms) is mandatory on anything tappable.

### Chips
- **Style:** 99px, 1px slate border, no fill, 14px / 500 body type.
- **State:** hover (fine pointers) moves both border and text to the accent. Chips here are non-interactive labels — audience categories, topic tags — not filters.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** solid `#1C2E4A` for content cards; `rgb(28 46 74 / 0.38)` for table wraps and secondary panels sitting over a tinted band.
- **Border:** 1px `rgb(66 94 123 / 0.35)`, or `rgb(255 255 255 / 0.09)` for the translucent variant.
- **Shadow Strategy:** none at rest; see Elevation & Depth.
- **Internal Padding:** 1.25–1.75rem.
- **Hover:** border to the accent, `translate: 0 -3px`. The lift is 3px — enough to read, not enough to feel springy.

### Inputs / Fields
- **Style:** `#1C2E4A` at 0.5 alpha, 1px fjord border at 0.5 alpha, 10px radius, white text in Barlow at 0.95rem, `0.8rem 1rem` padding.
- **Label:** 11px uppercase, 0.16em, mute grey, above the field.
- **Focus:** `outline: 2px solid` accent with the border also moving to the accent. The global `:focus-visible` ring is the same accent at 3px offset — focus is always the accent, never a browser default.

### Navigation
- **Style:** fixed, 4.25rem tall, black at 0.72 alpha with a 14px backdrop blur and a navy hairline underneath.
- **Brand:** the HSC mark (`assets/hsc-mark-reverse.svg`) at 1.7rem, then "HSC" in paper at 1.55rem Barlow Condensed 700, then "2027" in white on an accent chip at 0.82rem. The chip is part of the logotype, which is why it keeps white-on-orange where the pills take ink text.
- **Links:** 14px / 500 mute grey with a 2px transparent bottom border; active and hover move the text to paper and the border to the accent.
- **Mobile:** below 60rem the link row becomes a sheet behind a 44px toggle whose two bars converge and cross into an X with no keyframes — pure property transitions on `translate` and `rotate`.

### Save-the-Date Sheet (signature)
The circulating artefact, and the clearest statement of the world. One 1080×1350 sheet, ink-to-deep vertical gradient, split at 48% by a 3px accent edge. Above the edge: a single real photograph under a four-stop scrim (dark at top and bottom, nearly clear at 38%), the reverse HSC mark at 104px in the top-left, the conclave name in Barlow Condensed at 98px, the year in the accent, and one tracked Barlow line beneath. Below: the date numerals at 258px in the accent with a 26px accent dot between them, the month in Barlow Condensed at 52px, and the small print — QR on a white tile, site, disclaimers, attributions — held at 18–30px along the bottom edge. No panels, no cards, no rounded corners anywhere on the sheet.

## Do's and Don'ts

### Do:
- **Do** keep one accent per surface, and spend it on the single thing the reader must remember.
- **Do** use `#A8350D` for accent text on white and `#D9480F` only at 24pt or larger; full `#FF5A1F` on white is a fill, never ink.
- **Do** build raised surfaces from navy plus a 1px fjord hairline, and save shadow for hover and genuinely floating elements.
- **Do** gate every hover state behind `(hover: hover) and (pointer: fine)`.
- **Do** keep reduced-motion gentle: drop movement, keep colour and opacity fades.
- **Do** animate `translate` / `scale` as independent properties, not `transform`.
- **Do** check any circulating artefact at roughly 240px wide before calling it finished.
- **Do** keep the year as the accent chip in the lockup, so a new edition inherits the identity by changing one number.

### Don't:
- **Don't** introduce a third hue. Signal orange is a provisional-state signal, not a second accent, and nothing else enters the palette.
- **Don't** set running prose in Barlow Condensed, or a date in Barlow.
- **Don't** apply uniform letter-spacing across the type ramp — tracking falls as size rises.
- **Don't** add a radius value outside 10px / 14px / 99px / 50%.
- **Don't** put a resting shadow on a card.
- **Don't** reintroduce AI-generated decorative artwork; the organiser rejected it for this project and real photography is the standing answer.
- **Don't** carry the save-the-date's borderless, radius-zero treatment back into site components — it is a departure scoped to circulating artefacts.
