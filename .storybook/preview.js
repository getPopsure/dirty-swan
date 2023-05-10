import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';

import dirtySwanTheme from './dirtySwanTheme';
import { CustomTypes, FigmaStory } from './customBlocks';

import '../src/lib/scss/index.scss';

export const parameters = {
  controls: { expanded: true },
  docs: {
    theme: dirtySwanTheme,
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <CustomTypes />
        <Stories />
        <FigmaStory />
      </>
    ),
  },
  options: {
    storySort: {
      order: ['*', "Examples", "Atoms"], 
    },
  },
};
