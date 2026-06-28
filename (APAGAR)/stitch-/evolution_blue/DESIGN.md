---
name: Evolution Blue
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#42474e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#72777e'
  outline-variant: '#c2c7ce'
  surface-tint: '#396285'
  primary: '#00263f'
  on-primary: '#ffffff'
  primary-container: '#0b3c5d'
  on-primary-container: '#7fa7cd'
  inverse-primary: '#a3cbf2'
  secondary: '#00658c'
  on-secondary: '#ffffff'
  secondary-container: '#80cfff'
  on-secondary-container: '#00597b'
  tertiary: '#302100'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a3600'
  on-tertiary-container: '#ce9b00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cee5ff'
  primary-fixed-dim: '#a3cbf2'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#1f4a6c'
  secondary-fixed: '#c5e7ff'
  secondary-fixed-dim: '#80cfff'
  on-secondary-fixed: '#001e2d'
  on-secondary-fixed-variant: '#004c6a'
  tertiary-fixed: '#ffdf9d'
  tertiary-fixed-dim: '#f9bd14'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  h1:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

This design system embodies the intersection of high-end leisure and precision engineering. The brand personality is authoritative yet refreshing, positioning the product as a leader in aquatic technology and luxury pool construction.

The design style is **Corporate / Modern** with a lean toward **Minimalism**. It utilizes expansive white space to evoke the "cleanliness" of pure water, punctuated by sharp, technical accents that reflect engineering excellence. The UI communicates reliability through structured alignments and a premium feel through subtle depth and high-quality typography. The aesthetic avoids unnecessary flourishes, focusing instead on clarity, performance, and a professional "blueprint-to-reality" narrative.

## Colors

The palette is anchored by **Deep Blue (#0B3C5D)**, representing trust and structural integrity. This is supported by **Light Blue (#4FA3D1)** to symbolize the fluidity and clarity of water. **Solar Yellow (#F2B705)** acts as a high-visibility functional accent, specifically used for "heating," "energy," or primary calls to action.

**Graphite (#2B2B2B)** provides the technical weight required for typography and engineering specs, while **White (#FFFFFF)** ensures a clinical, premium finish. In Dark Mode, the Graphite transitions to a deep obsidian surface, while Deep Blue remains the primary brand identifier for buttons and active states.

## Typography

This design system utilizes **Work Sans** (substituting for Montserrat's structural feel) for headlines to provide a grounded, architectural presence. **Manrope** (substituting for Poppins' geometric clarity) is used for body copy and technical labels to ensure maximum readability and a refined, modern tone.

Headlines should be set with tight letter-spacing to feel impactful and engineered. Body text prioritizes generous line heights to maintain the "cleanliness" of the brand. Use the `label-caps` style for technical specifications, dimensions, and categories to evoke the feel of an engineering schematic.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop viewports, centered at 1280px to maintain a premium, controlled presentation. A 12-column system is used, with 24px gutters providing ample breathing room between technical data modules.

Vertical spacing follows a strict 8px base unit. Section-to-section transitions should use large gaps (80px+) to emphasize the minimalist, "clean" brand pillar. Data-heavy sections (engineering specs) should utilize a denser 4px sub-grid for alignment of technical labels and values.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Surfaces should feel like high-quality materials—stone, polished metal, or glass. 

Shadows are extra-diffused and low-opacity, using a subtle Deep Blue tint (`rgba(11, 60, 93, 0.08)`) instead of pure gray to maintain brand cohesion. In Dark Mode, elevation is communicated through slightly lighter gray surface fills rather than shadows, creating a "stacked" effect. Glassmorphism is used sparingly for navigation overlays to simulate the transparency of water.

## Shapes

The design system adopts a **Soft** shape language. This creates a balance between the "hard" precision of engineering and the "soft" comfort of a premium pool environment. 

Primary containers and buttons use a 0.25rem (4px) radius. Larger cards or sections may scale up to 0.75rem (12px). Interactive elements like toggle switches or search bars should remain consistent with the 4px standard to preserve the professional, technical aesthetic. Avoid pill-shaped buttons; rectangular forms with slight rounding better reflect structural stability.

## Components

- **Buttons:** Primary buttons use Deep Blue with White text. Secondary buttons use a Light Blue ghost style (border only). The "Solar Yellow" is reserved exclusively for high-urgency or "Heating/Active" status buttons.
- **Inputs:** Form fields feature a Graphite 1px border that thickens to 2px in Deep Blue upon focus. Labels use the `label-caps` typography for a technical look.
- **Cards:** White background with a subtle ambient shadow and 4px corner radius. Technical specs inside cards should be separated by thin, low-contrast dividers.
- **Chips/Badges:** Used for equipment status (e.g., "Active," "Maintaining"). Use subtle background tints of the status color with high-contrast text.
- **Progress Indicators:** Custom "Water-Level" bars using Light Blue to show project completion or chemical balances.
- **Data Tables:** Clean, minimalist rows with Graphite text. Header rows should have a very light gray background to distinguish them from data.
- **Project Timeline:** A vertical or horizontal stepper component that mimics a blueprint line, using Deep Blue for completed steps and Light Blue for active ones.