import type { Meta, StoryObj } from '@storybook/angular';
import { TopnavComponent } from './topnav.component';

const meta: Meta<TopnavComponent> = {
  title: 'Komponenten/Navigation & Disclosure/Topnav',
  component: TopnavComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Wrapper um `.ep-topnav` (css/components.css). Logo, Top-Level-Links mit Klapp-' +
          'Submenüs (.ep-nav-has-sub), rechts Such-Popover und Theme-Umschalter (.ep-nav-actions), ' +
          'CTA-Button. Disclosure-Logik in Angular: nur ein Menü offen, Escape und Außenklick ' +
          'schließen; der Theme-Button setzt data-theme am <html>.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<TopnavComponent>;

export const Interaktiv: Story = {};
