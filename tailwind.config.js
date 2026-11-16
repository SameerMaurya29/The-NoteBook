/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius))',
        sm: 'calc(var(--radius) - 2px)'
      },
      colors: {
        background: 'hsl(var(--paper))',
        foreground: 'hsl(var(--ink))',
        paper: {
          DEFAULT: 'hsl(var(--paper))',
          2: 'hsl(var(--paper-2))'
        },
        ink: 'hsl(var(--ink))',
        brown: 'hsl(var(--brown))',
        greenink: 'hsl(var(--green))',
        orangeink: 'hsl(var(--orange))',
        card: {
          DEFAULT: 'hsl(var(--paper-2))',
          foreground: 'hsl(var(--ink))'
        },
        popover: {
          DEFAULT: 'hsl(var(--paper))',
          foreground: 'hsl(var(--ink))'
        },
        primary: {
          DEFAULT: 'hsl(var(--green))',
          foreground: 'hsl(var(--paper))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--paper-2))',
          foreground: 'hsl(var(--brown))'
        },
        muted: {
          DEFAULT: 'hsl(var(--paper-2))',
          foreground: 'hsl(var(--brown))'
        },
        accent: {
          DEFAULT: 'hsl(var(--orange))',
          foreground: 'hsl(var(--paper))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))'
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
        hand: ['var(--font-hand)'],
        mono: ['var(--font-mono)'],
        reading: ['var(--font-reading)']
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
