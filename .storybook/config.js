import { configure } from '@storybook/react';

import '../src/lib/scss/index.scss';

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.mdx$/), module);
