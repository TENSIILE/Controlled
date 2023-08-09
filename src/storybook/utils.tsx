import React, { FC, PropsWithChildren } from 'react';
import { ComponentMeta, ComponentStory, Meta } from '@storybook/react';
import { ComponentAnnotations } from '@storybook/csf/dist/story';
import { ROOT_NAME } from './constants';
import { StoryTemplate } from './types';

export const createStory = <T,>(component: FC<T>, options?: ComponentAnnotations): Meta<PropsWithChildren<T>> =>
  ({
    component,
    ...options,
    title: `${ROOT_NAME}/${options?.title || component.displayName || component.name}`,
  } as unknown as ComponentMeta<typeof component>);

export const createTemplate = <T,>(Component: FC<T>): StoryTemplate<T, typeof Component> => {
  const templateCreator: ComponentStory<typeof Component> = args => <Component {...args} />;

  return {
    init: () => templateCreator.bind({}),
  };
};
