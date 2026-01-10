import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        surface: "var(--color-surface-main)",
        "surface-contrast": "var(--color-surface-contrast)",
        "surface-veil": "var(--color-surface-veil)",
        primary: "var(--color-text-primary)",
        "primary-foreground": "var(--color-surface-contrast)",
        brand: "var(--color-text-brand)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        soft: "var(--color-text-soft)",
        overlay: "var(--color-text-overlay)",
        white: "var(--color-white)",
        border: {
          faint: "var(--color-border-faint)",
          muted: "var(--color-border-muted)",
          light: "var(--color-border-light)",
          strong: "var(--color-border-strong)",
          "strong-muted": "var(--color-border-strong-muted)",
          grid: "var(--color-border-grid)",
          "grid-soft": "var(--color-border-grid-soft)",
        },
        outline: {
          muted: "var(--color-outline-muted)",
          contrast: "var(--color-outline-contrast)",
        },
        shadow: {
          soft: "var(--color-shadow-soft)",
          medium: "var(--color-shadow-medium)",
          strong: "var(--color-shadow-strong)",
          card: "var(--color-shadow-card)",
          mask: "var(--color-shadow-mask)",
        },
        cta: {
          glow: "var(--color-cta-glow)",
        },
        gradient: {
          muted: "var(--color-gradient-muted)",
        },
        progress: {
          DEFAULT: "var(--color-progress)",
          track: "var(--color-progress-track)",
        },
      },
      boxShadow: {
        "badge-ring": "0 0 0 4px var(--color-shadow-soft)",
        "contrast-ring": "0 0 0 2px var(--color-surface-contrast)",
        divider: "0px 1px 0px var(--color-surface-contrast)",
        elevated: "0px 1px 2px var(--color-shadow-medium)",
        hero: "0px 0px 0px 0.9056603908538818px var(--color-shadow-strong)",
        card: "0px 2px 4px var(--color-shadow-card)",
        mask: "0px -4px 8px var(--color-shadow-mask) inset",
        "feature-active": "0px 0px 0px 0.75px var(--color-border-strong) inset",
        "cta-inset": "0px 0px 0px 2.5px var(--color-cta-glow) inset",
        "vertical-white": "1px 0px 0px var(--color-white)",
      },
    },
  },
}

export default config
