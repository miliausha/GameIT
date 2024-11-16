import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'nft-card-primary': 'var(--nft-card-primary)',
        'nft-card-secondary': 'var(--nft-card-secondary)',
        'nft-card-back': 'var(--nft-card-back)',
        'gradient-primary': 'var(--gradient-primary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-highlighted': 'var(--text-highlighted)',
        'text-accent': 'var(--text-accent)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
  
} satisfies Config;
