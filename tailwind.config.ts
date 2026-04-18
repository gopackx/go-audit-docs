import type { Config } from 'tailwindcss';
import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './node_modules/fumadocs-ui/dist/**/*.js',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  presets: [createPreset()],
};

export default config;
