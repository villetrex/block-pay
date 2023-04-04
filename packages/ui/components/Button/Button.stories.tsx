import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

const meta: ComponentMeta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      options: ['text', 'contained', 'outlined'],
      control: { type: 'select' },
      description: 'Variant of the button',
      defaultValue: 'text',
    },
  },
  parameters: {
    nestedClassNames: {
      data: [
        {
          name: '.Carousel-dots',
          description: 'Dots wrapper',
        },
      ],
    },
  },
  args: {
    children: 'Button',
  },
};

export default meta;

const Template: ComponentStory<typeof Button> = props => <Button {...props} />;

export const Default = Template.bind({});

Default.args = { onClick: ev => action('onClick')(ev) };
