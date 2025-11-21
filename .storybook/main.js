import remarkGfm from 'remark-gfm';

export default {
  stories: ['../src/**/*.@(mdx|stories.@(tsx))'],

  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  staticDirs: ['../public', '../storybook-assets'],

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  framework: '@storybook/react-vite',
};
