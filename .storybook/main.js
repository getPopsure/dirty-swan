module.exports = {
  stories: ['../src/**/*.@(mdx|stories.@(tsx))'],

  addons: ['@storybook/addon-essentials'],

  staticDirs: ['../public', '../storybook-assets'],

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  framework: '@storybook/react-vite',
};
