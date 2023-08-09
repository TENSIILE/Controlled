import { FC } from 'react';
import { ComponentStory } from '@storybook/react';

export type StoryTemplate<Props, FCWithProps extends FC<Props>> = {
  init: () => ComponentStory<FCWithProps>;
};
