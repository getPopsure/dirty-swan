import dirtySwanTheme from './dirtySwanTheme';

import '../src/lib/scss/index.scss';
import './storybookCustomStyles.css';

export const parameters = {
  controls: { expanded: true },
  docs: {
    theme: dirtySwanTheme,
  },
  options: {
    storySort: {
      order: ['*', "Examples", "Atoms"], 
    },
  },
};

export const tags = ['autodocs'];
