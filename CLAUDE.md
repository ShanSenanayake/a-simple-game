# Project Specification: Mystery Riddle Game

You are an expert frontend developer helping me build a lightweight, text-based mystery riddle game for a friend. Use the strict environmental boundaries, architectural stack, and UI aesthetic guidelines outlined below for all generated code.

## 1. Tech Stack & Environment

- **Framework:** Svelte 5 (Raw Single Page App via Vite, _NOT_ SvelteKit)
- **Styling:** Tailwind CSS v4 (Using theme token utilities mapped via CSS @theme variables)
- **State Management:** Svelte native reactivity synced with browser `localStorage`
- **Linting & Formatting:** ESLint 9 (Flat Config) + Prettier

## 2. Visual & Aesthetic Architecture (Custom Theme)

The application follows a custom **Retrotechnical Terminal / Command-Line Interface (CLI)** aesthetic. You must exclusively use the theme design tokens configured in our CSS architecture.

### Theme Token Mapping Reference

- **Backgrounds:** Use `bg-terminal-bg` (strictly avoid generic `bg-black` or `bg-slate-900`)
- **Primary Text & Indicators:** Use `text-terminal-green`
- **Subtle Framework/Borders:** Use `border-terminal-dim` or transparent alpha classes (`border-terminal-green/30`)
- **Error/Alert States:** Use `text-terminal-alert` and `border-terminal-alert`
- **Typography Layouts:** Use `font-mono` (maps directly to our preferred system font stack)

### UI Layout Constraints

- Inputs must match command prompt rules (e.g., `<span class="text-terminal-green">user@system:~$</span>` preceding an input box).
- Interactive nodes must look like un-styled ASCII elements that light up using `hover:bg-terminal-green hover:text-terminal-bg` transitions rather than generic pill buttons.

## 3. Code & Reactivity Standards

When writing `.svelte` components, strictly follow these structural principles:

- **Svelte 5 Runes:** Maintain status and visibility flags utilizing reactive `$state()` variables and derived evaluation chains with `$derived()`.
- No standalone `<style>` sheets should be created inside individual components. Lean fully on the custom Tailwind classes.

## 5. Responsive Design

- **Mobile-first:** All layouts default to a standard iPhone viewport (~390px wide). Use Tailwind breakpoint prefixes (`sm:`, `md:`) to progressively enhance for larger screens — never write desktop-only styles without a mobile baseline.
- **Touch targets:** Interactive elements must be at least 44px tall.
- **Single-column baseline:** Grids and flex rows that span multiple columns on desktop must stack to 1–2 columns on mobile.

## 4. State Management & Persistence

- The active tier is captured globally inside an engine controller tracking a `currentStage` hook.
- **Persistence:** This stage index must dynamically write to `localStorage` on update. On application mount, initialize state by parsing the existing `localStorage` key so your friend can refresh the page without losing their place.
- **Answer Security:** Do not expose plain-text riddle answers in the frontend markup or client-side evaluation arrays. Obfuscate answers using simple base64 strings or check them against simple hashes so they cannot be read instantly using browser developer tools.
