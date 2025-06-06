import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },        // Custom theme colors based on the new palette
        theme: {
          purple: 'hsl(var(--theme-purple))',     // #9F45B0
          pink: 'hsl(var(--theme-pink))',         // #FE8CC5
          lightPink: 'hsl(var(--theme-light-pink))', // #FFE4F2
          dark: 'hsl(var(--theme-dark))',         // #00001F
        },
        // Legacy pub colors updated to match new theme
        pub: {
          amber: 'hsl(var(--pub-amber))',
          copper: 'hsl(var(--pub-copper))',
          mahogany: 'hsl(var(--pub-mahogany))',
          brass: 'hsl(var(--pub-brass))',
          leather: 'hsl(var(--pub-leather))',
          foam: 'hsl(var(--pub-foam))',
          gold: 'hsl(var(--pub-gold))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Pub-themed animations
        'fizz': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0.9)', opacity: '0' },
        },
        'pour': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.1)' },
        },
        'bubble': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-5px) scale(1.05)', opacity: '1' },
        },
        'cheers': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        'slide-beer': {
          '0%': { transform: 'translateX(-100px) rotate(-15deg)' },
          '100%': { transform: 'translateX(0) rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Pub-themed animations
        'fizz': 'fizz 0.6s ease-out',
        'pour': 'pour 1.2s ease-in-out infinite',
        'bubble': 'bubble 3s ease-in-out infinite',
        'cheers': 'cheers 1s ease-in-out',
        'slide-beer': 'slide-beer 0.8s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
