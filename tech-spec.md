# Japan Tours — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `^14.2.0` | Framework — App Router, SSG, Image optimization |
| `react` | `^18.3.0` | UI framework |
| `react-dom` | `^18.3.0` | React DOM renderer |
| `typescript` | `^5.4.0` | Type safety |
| `tailwindcss` | `^3.4.0` | Utility-first styling |
| `framer-motion` | `^11.0.0` | Animation engine — parallax, scroll-triggered reveals, hover states |
| `lenis` | `^1.1.0` | Smooth scroll with inertia |
| `@types/node` | `^20.0.0` | Node.js type definitions |
| `@types/react` | `^18.3.0` | React type definitions |
| `@types/react-dom` | `^18.3.0` | React DOM type definitions |
| `autoprefixer` | `^10.4.0` | CSS vendor prefixes |
| `postcss` | `^8.4.0` | CSS processing pipeline |

### Fonts (Google Fonts via `next/font`)

- **Bebas Neue** — Display headings ("JAPAN", section titles)
- **Inter** — Body text, nav, buttons, small caps
- **Cormorant Garamond** (weight 300, italic) — Editorial serif for contact heading

### shadcn/ui Components

This project requires only one pre-built shadcn component; all other UI is custom-built per the design spec.

| Component | Install Command | Usage |
|-----------|----------------|-------|
| `input` | `npx shadcn add input` | Contact form underline-style text fields (customized: transparent bg, hairline border-bottom, lime focus) |

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| `Navigation` | Custom | Fixed top bar. Transparent → blurred dark on scroll. Logo, center links with animated underline, Book pill, social icons column. |
| `Footer` | Custom | Matches nav styling. Wordmark, nav links, social icons row. |
| `CustomCursor` | Custom | 8px lime dot → 32px hollow circle on interactive hover. RAF loop with lerp. Desktop only. |

### Sections (page-level, composed once)

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Three z-depth planes (mountains, typography, kimono). Parallax via `useScroll`/`useTransform`. Polaroid strip with video cards. Floating Book button. |
| `AboutSection` | Custom | Black bg. Heading with hairlines. Two-column: editorial text with lime accent phrases + vertical timeline with photo clusters. |
| `IncludedSection` | Custom | Black bg. Left-aligned heading with hairline. 4-card bento grid. |
| `ContactSection` | Custom | Full-bleed bg image with gradient overlay. Frosted-glass form panel with 3 underline fields. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| `PolaroidCard` | Custom | `HeroSection` (×5) | Video thumbnail + caption. Hover: lift, glow, video full-speed. |
| `PhotoCluster` | Custom | `AboutSection` (×3) | 2 offset photos with border/shadow. Hover: photos separate with rotation. |
| `GlassCard` | Custom | `IncludedSection` (×4) | Glassmorphism panel: `backdrop-filter: blur(12px)`, semi-transparent bg/border. Hover: lift, lime border, icon scale. |
| `TimelineNode` | Custom | `AboutSection` (×3) | Lime dot + vertical hairline + label + photo cluster. |
| `UnderlineInput` | Custom (extends shadcn `input`) | `ContactSection` (×3) | Transparent bg, hairline border-bottom, lime focus state. |
| `AnimatedUnderline` | Custom | `Navigation` | CSS width transition on hover for nav links. |

### Hooks

| Hook | Purpose |
|------|---------|
| `useLenis` | Initialize and expose Lenis instance for smooth scroll. Integrate with Framer Motion via `useLenis` + `requestAnimationFrame`. |
| `useMousePosition` | Track mouse coordinates with lerp for custom cursor. Desktop only. |
| `useInViewOnce` | One-shot IntersectionObserver wrapper. Disconnects after trigger. Used for all scroll-triggered entrance animations. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Hero parallax (mountains 0.3x, typography 0.5x, polaroid -0.4x)** | Framer Motion `useScroll` + `useTransform` | Scroll-progress driven `translateY`/`translateX` on each plane. Mountains at 120% height to allow upward travel. | Medium |
| **"JAPAN" text-stroke treatment** | CSS only | `-webkit-text-stroke: 2px rgba(250,250,250,0.85)`, `color: transparent`. Positioned at `bottom: 15%` so mountains crop lower half. | Low |
| **Hero entrance stagger** | Framer Motion `motion.div` with `initial`/`animate` | 5-step sequence: mountains → typography → kimono → polaroids (stagger 100ms) → nav. Different delays per element. | Low |
| **Polaroid card hover** | Framer Motion `whileHover` | `translateY(-6px)`, neutralized rotation, lime-tinted box-shadow. Video playback toggle via `useRef`. | Low |
| **Floating Book button hover fill** | CSS `::after` pseudo-element | Pseudo-element with `height: 0% → 100%` from bottom, `background: linear-gradient(to top, #D4F87A, #F5E8D3)`. | Low |
| **Nav scroll background transition** | Framer Motion `useScroll` + `useTransform` | Toggle `background` and `backdrop-filter` when `scrollY > 100px`. | Low |
| **Nav link underline draw** | CSS only | `::after` pseudo with `width: 0% → 100%`, `transform-origin: left`, CSS transition. | Low |
| **Custom cursor follow** | Vanilla JS `requestAnimationFrame` | Lerp-based position tracking (`lerp: 0.12`). State machine: dot ↔ circle on interactive hover via event delegation. | Medium |
| **About timeline stagger reveal** | Framer Motion `useInView` + `staggerChildren` | Parent `variants` with `staggerChildren: 0.2`. Each `TimelineNode` fades in + `translateY(40px → 0)`. Centerpiece animation. | Medium |
| **Accent text color glow** | Framer Motion `useInView` + `animate` | Phrases transition from `#FAFAFA` to `#D4F87A` with `text-shadow` glow when 50% in view. 200ms stagger. | Low |
| **Photo cluster hover separation** | Framer Motion `whileHover` | Photo 1: `rotate(-6deg) translateX(-8px)`, Photo 2: `rotate(6deg) translateX(8px)`. | Low |
| **Bento card hover** | Framer Motion `whileHover` | `translateY(-4px)`, lime border, icon `scale(1.1)`, lime-tinted shadow. | Low |
| **Bento cards stagger entrance** | Framer Motion `useInView` + `staggerChildren` | `staggerChildren: 0.1`, each card fades in + `translateY(30px → 0)`. | Low |
| **Contact form entrance** | Framer Motion `useInView` + `staggerChildren` | Panel slides in from left (`translateX(-40px)`), then fields stagger 100ms. Background subtle scale `1.05 → 1`. | Low |
| **Form field focus underline** | CSS only | `border-bottom-color` transition to `#D4F87A` on `:focus`. | Low |
| **Image lazy-load fade** | Framer Motion `useInViewOnce` | `opacity: 0 → 1` over `0.4s ease-out` on IntersectionObserver trigger. | Low |

---

## State & Logic Plan

### 1. Cursor State Machine

The custom cursor operates as a 2-state machine ("dot" / "circle") driven by mouse proximity to interactive elements. Use event delegation on `document` — listen for `mouseenter`/`mouseleave` on `[href], button, [role="button"], input, textarea, .cursor-hover` targets. State stored in React ref (not useState) to avoid re-renders at 60fps. Position updated via `requestAnimationFrame` with lerp interpolation.

### 2. Lenis ↔ Framer Motion Scroll Sync

Lenis must drive Framer Motion's scroll perception. Initialize Lenis in a root provider, then call `lenis.raf(timeStamp)` inside a `requestAnimationFrame` loop. Framer Motion's `useScroll` hooks will automatically pick up the scroll position. The Lenis instance should be exposed via React context so child components can call `lenis.scrollTo()` for anchor navigation.

### 3. Video Lifecycle Management

Each `PolaroidCard` contains a looping video. To manage performance:
- Videos use `preload="metadata"`, `muted`, `playsInline`, `loop` attributes
- IntersectionObserver per card with `rootMargin: "100px"` — `play()` when entering, `pause()` when leaving
- On hover, videos play at full speed regardless of viewport (override IO state)
- Store video refs in a map indexed by card ID to allow individual control

### 4. Form State

Contact form is 3 fields (name, phone, comment). Use uncontrolled inputs with `useRef` — no validation library needed. On submit, simulate async request with a 1s timeout and show a toast/inline success message. No backend integration; the form is presentational.

---

## Other Key Decisions

### SSG over SSR

This is a pure marketing landing page with no dynamic data, auth, or API routes. Use Next.js `output: 'export'` for static site generation. All content is hardcoded. No `getServerSideProps` or API routes needed.

### Image Strategy

Use `next/image` with `priority` on the hero mountain background and kimono figure (above-the-fold). All other images lazy-loaded with `loading="lazy"`. The hero mountain image is `120%` height of container to accommodate parallax scroll — use `fill` with `sizes="100vw"`. Kimono figure is a transparent PNG composited via absolute positioning.

### Z-Index Architecture (Hero)

The hero's depth layering is critical. Strict z-index order:
1. `z-1` — Mountain background image (`position: absolute; inset: 0`)
2. `z-2` — "JAPAN" outlined typography (`position: absolute; bottom: 15%`)
3. `z-3` — Cherry blossom branches (right-edge framing)
4. `z-4` — Kimono figure (`position: absolute; right: 5%; bottom: 0`)
5. `z-5` — Polaroid strip + navigation
6. `z-6` — Floating Book button

The mountain image fills the entire background plane and visually crops the lower half of the typography naturally through overlap — no CSS mask needed.
