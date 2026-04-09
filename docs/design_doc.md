# Design Document - Shantanu Jagirdar Portfolio

## 1. Visual Identity
### 1.1 Color Palette
- **Piano Ivory** (`#F8F5F2`): Primary background, representing piano keys.
- **Piano Ebony** (`#1A1A1A`): Primary text and dark sections, representing the piano body.
- **Piano Gold** (`#C5A059`): Accent color for highlights, buttons, and branding.
- **White** (`#FFFFFF`): Used for text on dark backgrounds (Hero section).

### 1.2 Typography
- **Serif (Display)**: Used for headings and branding to convey elegance and classical roots.
- **Sans-Serif (Body)**: Used for readability in descriptions and navigation.
- **Cursive/Script**: Used for the "Jagirdar" signature to add a personal, artistic touch.

## 2. Technical Architecture
### 2.1 Frontend Stack
- **React 18**: Component-based UI architecture.
- **Vite**: Build tool for fast development and optimized production bundles.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **Motion (Framer Motion)**: For high-quality animations and transitions.
- **Lucide React**: For consistent, lightweight iconography.

### 2.2 Key Components
- `App.tsx`: Root component managing global state (menu, scroll).
- `Sections.tsx`: Modular components for Hero, Listen, Gigs, Gallery, and Contact.
- `PianoScroll.tsx`: A custom visual indicator that mimics piano keys as the user scrolls.
- `utils.ts`: Utility functions for class merging (`cn`).

## 3. Interaction Design
- **Scroll Awareness**: The navbar changes from transparent to solid ivory as the user leaves the hero section.
- **Mobile Drawer**: A spring-animated side drawer for mobile navigation.
- **Hover Effects**: Subtle scaling and color shifts on interactive elements (buttons, social icons).

## 4. Asset Management
- **Images**: Optimized via CDN (Unsplash/Picsum) with `referrerPolicy="no-referrer"`.
- **Icons**: SVG-based Lucide icons for scalability.
