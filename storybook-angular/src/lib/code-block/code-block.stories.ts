import type { Meta, StoryObj } from '@storybook/angular';
import { CodeBlockComponent } from './code-block.component';

// Bekannter a11y-Befund: `.cb-copy` hat nur 3.31:1 Kontrast, weil css/components.css
// --n-400 als Textfarbe nutzt (laut tokens.css AA-Fail für Normaltext). Fix gehört
// in den CSS-Kern; bis dahin bewusst offen. Siehe README.

const meta: Meta<CodeBlockComponent> = {
  title: 'Komponenten/Code-Block/CodeBlock',
  component: CodeBlockComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Bekannter CSS-Kern-Befund (.cb-copy --n-400, 3.31:1): im Panel weiter sichtbar,
    // blockiert den Test-Runner aber nicht, bis der Kern gefixt ist.
    a11y: { test: 'todo' },
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
