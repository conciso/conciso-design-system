import type { Meta, StoryObj } from '@storybook/angular';
import { CodeBlockComponent } from './code-block.component';

// Bekannter a11y-Befund: `.cb-copy` hat nur 3.31:1 Kontrast, weil css/components.css
// --n-400 als Textfarbe nutzt (laut tokens.css AA-Fail für Normaltext). Fix gehört
// in den CSS-Kern; bis dahin bewusst offen. Siehe README.

const meta: Meta<CodeBlockComponent> = {
  title: 'Organisms/CodeBlock',
  component: CodeBlockComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    // Der Grund für dieses 'todo' ist weg: .cb-copy trug --n-400 mit 3.31:1 und nutzt
    // jetzt --n-500 (gegen den echten Grund 5,32:1 im Light, 8,01:1 im Dark). Wieder
    // scharf schalten, sobald der Test-Runner einmal grün durchgelaufen ist.
    a11y: { test: 'todo' },
    docs: {
      description: {
        component:
          'Darstellung von Quellcode mit Header aus Sprachkennung und Kopier-Button. ' +
          'Für Wissens- und Technikbeiträge. Varianten: Standard, mit Zeilennummern, ' +
          'Terminal sowie Inline-Code.',
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
