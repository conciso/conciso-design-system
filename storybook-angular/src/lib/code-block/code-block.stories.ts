import type { Meta, StoryObj } from '@storybook/angular';
import { CodeBlockComponent } from './code-block.component';

const meta: Meta<CodeBlockComponent> = {
  title: 'Komponenten/Seite & Marke/CodeBlock',
  component: CodeBlockComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wrapper um `.cb-wrap` (css/components.css). Header mit Sprach-Label und ' +
          'optionalem Kopier-Button, Code in `pre.cb-body`. Optionale Terminal-Variante ' +
          '(`.cb-terminal`). Code bleibt Klartext (keine Syntax-Spans).',
      },
    },
  },
  argTypes: {
    terminal: { control: 'boolean' },
    copyable: { control: 'boolean' },
  },
  args: {
    lang: 'HTML',
    code: '<button class="btn btn-filled btn-co">Kontakt</button>',
    terminal: false,
    copyable: true,
  },
};
export default meta;

type Story = StoryObj<CodeBlockComponent>;

export const Interaktiv: Story = {};

export const Terminal: Story = {
  args: {
    lang: 'bash',
    terminal: true,
    code: 'npm install\nnpm run storybook',
  },
};
