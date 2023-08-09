import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { version } from '../package.json';
import { ROOT_NAME } from '../src/storybook/constants';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: `${ROOT_NAME} v.${version}`,
  }),
});
