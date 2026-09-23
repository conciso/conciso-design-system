import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, waitFor } from 'storybook/test';
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

export const Interaktiv: Story = {
  // A11y-Grundgerüst: `<code>` im `<pre>` und tabindex="0" für die Tastatur-Erreichbarkeit
  // des horizontal scrollbaren Blocks (siehe code-block-verwendung.mdx, „Barrierefreiheit“).
  play: async ({ canvasElement }) => {
    const pre = canvasElement.querySelector('pre.cb-body');
    expect(pre).toHaveAttribute('tabindex', '0');
    expect(pre?.querySelector('code')).toHaveTextContent(
      '<button class="btn btn-filled btn-co">Kontakt</button>',
    );
    (pre as HTMLElement | null)?.focus();
    expect(pre).toHaveFocus();
  },
};

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
      // Accessible Name kommt vom aria-label und bleibt stabil — ein Bedienelement trägt
      // den Namen seiner Funktion, nicht den seines letzten Ereignisses (a11y-Regel aus
      // code-block-verwendung.mdx). Der Button heißt vor und nach dem Klick gleich.
      const button = c.getByRole('button', { name: 'Code kopieren' });
      await userEvent.click(button);
      // Die Erfolgsmeldung wird jetzt in der eigenen Live-Region angekündigt, nicht mehr
      // über einen Namenswechsel am Button.
      // waitFor, weil die Region von Anfang an im DOM steht: findByRole kehrt sofort
      // zurück, der Text erscheint aber erst, wenn die clipboard-Promise aufgeloest ist.
      const status = await c.findByRole('status');
      await waitFor(() => expect(status).toHaveTextContent('Code kopiert.'));
      expect(c.getByRole('button', { name: 'Code kopieren' })).toBeInTheDocument();
      expect(button).toHaveTextContent('Kopiert!');
    } finally {
      if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
      else delete (navigator as { clipboard?: Clipboard }).clipboard;
    }
  },
};
