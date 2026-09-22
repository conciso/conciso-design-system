import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { CodeBlockComponent } from '@conciso/design-system-angular';

const meta: Meta<CodeBlockComponent> = {
  title: 'Komponenten/Code-Block/Code-Block',
  component: CodeBlockComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
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

export const KopierButton: Story = {
  name: 'Kopier-Button',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  // Clipboard-API im Test-Browser deterministisch mocken: ein echter Zugriff bräuchte
  // Berechtigungen, die im headless Chromium nicht garantiert erteilt sind. Geprüft wird
  // das sichtbare Feedback (Button-Text wechselt auf „Kopiert!“), nicht der echte Copy.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    try {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.resolve() },
        configurable: true,
      });
      await userEvent.click(c.getByRole('button', { name: 'Kopieren' }));
      await expect(await c.findByRole('button', { name: 'Kopiert!' })).toBeInTheDocument();
    } finally {
      if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
      else delete (navigator as Navigator & { clipboard?: Clipboard }).clipboard;
    }
  },
};
