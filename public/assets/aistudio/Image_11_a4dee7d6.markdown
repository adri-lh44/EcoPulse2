---
name: EcoPulse Biome HUD
colors:
  surface: '#0c1420'
  surface-dim: '#0c1420'
  surface-bright: '#323947'
  surface-container-lowest: '#070e1a'
  surface-container-low: '#141c28'
  surface-container: '#18202c'
  surface-container-high: '#232a37'
  surface-container-highest: '#2d3542'
  on-surface: '#dbe3f4'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dbe3f4'
  inverse-on-surface: '#29313e'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#45dfa4'
  on-secondary: '#003825'
  secondary-container: '#00bd85'
  on-secondary-container: '#00452e'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0c1420'
  on-background: '#dbe3f4'
  surface-variant: '#2d3542'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  label-hud:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-hud-micro:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
  metric-numeral:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends pristine ecological stewardship with precision high-performance productivity and telemetry HUD mechanics. It synthesizes the editorial restraint of luxury environmental reports with the immediate tactile feedback of modern performance tools and gamified habit trackers.

### Personality & Emotional Response
- **Vibrant Scientific Rigor:** Interfaces feel like telemetry instruments aboard an ecological research vessel—authoritative, metric-driven, yet visually captivating.
- **Biophilic Futurism:** Interfaces do not simulate leaves or wood; instead, they simulate vital energy, atmospheric luminescence, photon capture, and natural cycles.
- **Empowered Momentum:** Gamification cues (streaks, impact trees, carbon offsets) provide intrinsic delight without juvenile noise, maintaining an elevated, adult tone.

### Design Movement: Atmospheric Glassmorphism & Cyber-Natural Minimalism
- Deep, light-absorbing obsidian foundations allow glowing bio-luminescent emerald and solar accents to guide attention with laser precision.
- Layered crystalline acrylic planes with inner specular reflections establish depth.
- Razor-sharp metric readouts and mono-spaced tabular numerals ensure data clarity within playful gamified structures.

## Colors

The palette models the natural transition from subterranean deep earth to canopy sunlight and ionizing aurora borealis.

### Functional Roles
- **Primary (`#10B981`) & Secondary (`#34D399`):** Represents photosynthetic active radiation and living biomes. Used for positive trajectory metrics, active energy states, primary trigger buttons, and level progression bars.
- **Tertiary Solar Amber (`#F59E0B`):** Denotes thermal output, sun hours, streaks, urgent ecological interventions, and heritage trail milestones.
- **Deep Obsidian Neutral (`#0B131F` base with `#0F172A` elevated tiles):** Light-absorbing atmospheric canvas providing ultra-high contrast for glowing neon elements.
- **Specular Border Accent (`rgba(52, 211, 153, 0.2)` to `rgba(245, 158, 11, 0.15)`):** Subtle gradient stroke along glass boundaries that simulates directional light refractions.
- **Semantic Mappings:**
  - `status-success`: `#10B981` (Carbon Absorbed / Action Verified)
  - `status-warning`: `#F59E0B` (Resource Threshold / Expiring Challenge)
  - `status-danger`: `#EF4444` (Eco-Debt / Deforestation Alert)
  - `status-info`: `#38BDF8` (Atmospheric Moisture / Sensor Link)

## Typography

The typography system operates on three tiers:
1. **Outfit (Headlines & Gamified Numeric Metrics):** Open geometric proportions with balanced counters. Delivers an optimistic, forward-leaning tone suitable for level stats and bold brand moments.
2. **Plus Jakarta Sans (Body & Context):** High legibility at reading sizes with crisp, rounded apertures that soften dense sustainability readouts.
3. **Space Grotesk (HUD Badges, Timers, Telemetry):** Monospaced-inspired technical proportioning for data trackers, coordinates, and gamified progress tickers.

### Typesetting Rules
- All HUD badges, taglines, and category indicators must use `label-hud` or `label-hud-micro` set in uppercase with tracking enabled.
- Avoid pure white (`#FFFFFF`) for continuous body text; use neutral tones (`#CBD5E1`) to reduce glare on pure dark backdrops.

## Layout & Spacing

The system runs on a 12-column dynamic fluid grid on desktop and a 4-column layout on mobile, adhering to an 8pt structural rhythm.

### Grid & Viewports
- **Desktop (1280px+):** 12 columns, 24px gutters, max layout container width of 1440px centered, 48px outer canvas margin.
- **Tablet (768px - 1279px):** 8 columns, 20px gutters, 32px outer canvas margin.
- **Mobile (320px - 767px):** 4 columns, 16px gutters, 20px outer canvas margin.

### Spatial Relationships
- Vertical stack rhythm strictly defaults to `space-md` (16px) for intra-card items and `space-xl` (40px) between major functional modules.
- HUD data clusters sit compactly with `space-xs` (4px) gaps between numeric values and metric unit markers.

## Elevation & Depth

Visual hierarchy uses physical light dispersion across semi-transparent glass plates rather than traditional drop shadows.

### Atmospheric Glass Tiers
- **Tier 0 (Substrate Canvas):** `#0B131F` solid background with soft radial background gradients (`#064E3B` and `#0F172A`) blooming at 40% opacity.
- **Tier 1 (Panels & Feed Cards):** Background `rgba(15, 23, 42, 0.65)` layered with `backdrop-filter: blur(16px)` and a 1px border stroke colored `rgba(255, 255, 255, 0.08)`.
- **Tier 2 (Interactive Floating Controls & Modals):** Background `rgba(15, 23, 42, 0.85)` with `backdrop-filter: blur(24px)`, bounded by a top-to-bottom directional gradient border (`rgba(52, 211, 153, 0.3)` to `rgba(255, 255, 255, 0.05)`).
- **Tier 3 (Active HUD Overlays & Hero Tooltips):** Background `rgba(6, 78, 59, 0.8)` layered with neon inner glow `inset 0 1px 0 rgba(52, 211, 153, 0.4)`.

### Luminous Emittance (Glow Accents)
- Interactive buttons and active progress nodes cast ambient photon halos using `box-shadow: 0 0 24px -4px rgba(16, 185, 129, 0.45)`.
- Solar Amber achievement badges emit a concentrated warmth aura: `box-shadow: 0 0 20px -2px rgba(245, 158, 11, 0.35)`.

## Shapes

The interface balances biological curvature with structural aerodynamic precision. A roundedness value of `2` provides a base radius of 8px (`0.5rem`), standard cards at 16px (`1rem`), and display panels at 24px (`1.5rem`).

### Geometric Directives
- **Data Panels & Glass Cards:** Set to `rounded-lg` (16px / `1rem`) to keep panels structured and clean on dashboard matrices.
- **Interactive Action Buttons & Micro-Badges:** Use circular pill boundaries (`rounded-full` / 9999px) to communicate touch readiness, gamified tactility, and dynamic energy.
- **Progress Track Gauges:** Pill-shaped track enclosures (`rounded-full`) that cradle internal progress fills smoothly.

## Components

### Buttons
- **Primary Bio-Action:** Pill shape, gradient background from `#10B981` to `#059669`, text `#0B131F` (high-contrast deep forest slate), bold `Space Grotesk` or `Outfit` label. Includes an ambient emerald glow. On hover: transforms upward by 1px with increased luminescence.
- **Secondary Ghost Glass:** Pill shape, background `rgba(255, 255, 255, 0.04)`, 1px border `rgba(52, 211, 153, 0.3)`, text `#34D399`. On hover: background shifts to `rgba(52, 211, 153, 0.12)`.
- **Heritage Solar Trigger:** Pill shape, background from `#F59E0B` to `#D97706`, text `#0B131F`, for streak redemption and high-value environmental quest completions.

### Chips & HUD Micro-Badges
- Scaled to 24px height.
- Dark semi-translucent interior (`rgba(11, 19, 31, 0.7)`) bounded by a 1px colored rim corresponding to biome classification (e.g., `#10B981` for Mangrove Restoration, `#F59E0B` for Desert Solar Initiative).
- Left-aligned pulsing 6px indicator beacon signaling live telemetry or verified action.

### Cards & Trail Containers
- Nested background glass plates with 16px corner radius.
- Accentuated with specular top-edge highlighting: a 1px linear gradient border running transparent -> `#34D399` -> transparent.
- Header incorporates a prominent metric numeral paired with Space Grotesk tracking labels.

### Input Fields & Search Bars
- Background `rgba(15, 23, 42, 0.6)`. 1px structural stroke (`rgba(255, 255, 255, 0.12)`).
- When focused, transitions to an energetic `#10B981` border with a `0 0 0 3px rgba(16, 185, 129, 0.2)` ring.
- Placeholder text tinted in muted biophilic slate (`#64748B`).

### Interactive Checkboxes & Gamified Radio Elements
- Custom 20x20px squircle containers.
- Unchecked: 1.5px border `rgba(255, 255, 255, 0.2)` with glass interior.
- Checked: `#10B981` solid fill containing an obsidian checkmark, framed by a soft bio-mint bloom.

### Specialized Component: Circular Eco-Focus Timer Ring
- High-contrast circular progress ring for productivity sprints and carbon-neutral deep work.
- Inactive track: 4px stroke `rgba(255, 255, 255, 0.06)`.
- Active meter: 4px conical gradient stroke (`#10B981` through `#34D399` to `#F59E0B`) terminating in a glowing tracer point.
- Center displays `Outfit` countdown numerals with real-time equivalent metric below (e.g., "0.04g CO2 Mitigated").

### Specialized Component: Ecological Trail Card
- Immersive split panel: Top 60% features high-definition imagery or topographical vector wireframe with dark emerald gradient vignette; bottom 40% houses HUD stats (elevation, flora index, XP reward, trail difficulty badge).