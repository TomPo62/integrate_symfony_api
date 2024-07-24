import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        md: '0.9rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        accent: 'var(--accent-color)',
        gray: 'var(--gray-color)',
        background: 'var(--background-color)',
        'bg-light-1': 'var(--bg-light-1)',
        'bg-light-2': 'var(--bg-light-2)',
        'bg-light-3': 'var(--bg-light-3)',
        'bg-light-4': 'var(--bg-light-4)',
        'bg-light-5': 'var(--bg-light-5)',
        
      },
    },
  },
  plugins: [],
};
export default config;
