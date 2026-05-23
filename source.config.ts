import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      // Adds a `language-<lang>` class to each <code> so components can tell
      // command/shell blocks apart from real code (see MacCodeBlock).
      addLanguageClass: true,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
