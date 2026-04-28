# Design Brief

## Tone & Differentiation
Premium iOS minimalist habit tracker. Calm, intentional, wellness-focused. Each section conveys focus through color psychology and soft layered depth.

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Primary (Navy) | `0.32 0.08 280` | `0.75 0.12 280` | Navigation, structure, hierarchy |
| Dark Charcoal | `0.25 0.02 280` | — | Workout section background |
| Dark Crimson | `0.42 0.12 25` | `0.60 0.15 25` | Accent highlights, active states |
| Lime-Green | `0.75 0.18 130` | `0.85 0.20 130` | Meditation section, wellness accent |
| Deep Blue | `0.40 0.10 265` | `0.65 0.15 265` | Reading section, calm focus |
| Aqua | `0.65 0.15 220` | `0.75 0.18 220` | Hydration section, refreshment |
| Terracotta | `0.60 0.12 40` | `0.70 0.14 40` | Mood section, warmth |
| Background | `0.98 0 0` | `0.13 0.01 280` | Main surface |
| Foreground | `0.20 0.02 280` | `0.95 0.02 280` | Text, contrast |

## Typography
- **Display**: General Sans (geometric, modern, hierarchy)
- **Body**: General Sans (calm, legible, consistent)
- **Mono**: Geist Mono (data, codes, technical)

## Shape Language
- **Card radius**: 12px soft rounded corners
- **Button radius**: 24px pill-shaped CTAs
- **Tab radius**: 0px clean alignment
- **Shadows**: Soft, depth-creating `shadow-md` for cards

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header/Nav | `bg-primary text-primary-foreground` with `border-b` | Consistent app branding |
| Tab Bar (Bottom) | `bg-background border-t` with minimalist icon outlines | iOS-native navigation |
| Home Dashboard | `bg-background` with muted card summaries | Yesterday's progress overview |
| Habit Sections | Section-specific gradient backgrounds (workout, hydration, meditation, reading, mood) | Intuitive navigation by color |
| Footer | `bg-muted/20` with subtle border | Grounding UI hierarchy |

## Spacing & Rhythm
- **Gap**: 1rem between cards, 0.75rem within card content
- **Padding**: 1.5rem on sections, 1rem on cards
- **Type scale**: 16px body, 18px labels, 20px section titles, 24px headings

## Component Patterns
- **Section blocks**: Softly rounded 12px cards with subtle `box-shadow`
- **Icon style**: Minimalist 2D black outline icons (stroke-2, no fill)
- **Progress indicators**: Circular timers with thin borders, no bold fills
- **Buttons**: Full-width or inline pill-shaped, text-centered, smooth transitions

## Motion
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for interactive states
- **Tab switches**: Fade without bounce
- **Progress animations**: Gentle linear fill

## Constraints
- No harsh pure red, no garish gradients, no rounded-full on large cards
- OKLCH-only color system, no hex or RGB literals
- Mobile-first responsive design (sm: 640px, md: 768px, lg: 1024px)
- Light mode primary, dark mode available

## Signature Detail
Each habit section (Workout, Hydration, Meditation, Reading, Mood) has a unique background color that serves as a visual anchor. Combined with minimalist black outline icons, users navigate intuitively by color + icon shape.
