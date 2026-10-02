import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { TeamVoiceComponent } from '@conciso/design-system-angular';

const meta: Meta<TeamVoiceComponent> = {
  title: 'Komponenten/Zitate & Testimonials/TeamVoice',
  component: TeamVoiceComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Team-Stimme in editorialer, fotostarker Variante: großes Foto seitlich, Zitat und ' +
          'Attribution daneben. In Reihen abwechselnd links/rechts angeordnet. Für ' +
          'Repräsentation, wenn Gesichter und Präsenz zählen, etwa auf Karriereseiten.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
  },
  args: {
    quote:
      'Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein.',
    name: 'Lena Brandt',
    roleLabel: 'Softwareentwicklerin, seit 2021',
    area: 'co',
    image: '',
    imageAlt: 'Teamfoto',
  },
};
export default meta;

type Story = StoryObj<TeamVoiceComponent>;

export const Interaktiv: Story = {};

export const AlternierendeReihen: Story = {
  name: 'Alternierende Reihen',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [TeamVoiceComponent] },
    template: `
      <div class="team-voices">
        <cds-team-voice area="co" name="Lena Brandt" roleLabel="Softwareentwicklerin, seit 2021"
          quote="Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein."></cds-team-voice>
        <cds-team-voice area="wo" name="Tobias Reuter" roleLabel="Lead Developer, seit 2018"
          quote="Was mich hält, ist die Ehrlichkeit. Wir reden über das, was gut läuft, und genauso über das, was nicht klappt."></cds-team-voice>
        <cds-team-voice area="es" name="Mara Vogt" roleLabel="Platform Engineer, seit 2022"
          quote="Hier zählt, was funktioniert — nicht, wer am lautesten ist. Das macht die Arbeit ruhig und fokussiert."></cds-team-voice>
      </div>
    `,
  }),
  // Akzeptanzkriterium: Jede .team-voice steckt allein in ihrem cds-team-voice-Host, deshalb
  // zählt die Position des Hosts in .team-voices. Erste und dritte Karte: Bild links vom Text,
  // zweite Karte: Bild rechts vom Text.
  play: async ({ canvasElement }) => {
    const hosts = Array.from(canvasElement.querySelectorAll('.team-voices > cds-team-voice'));
    await expect(hosts).toHaveLength(3);
    const media = hosts.map((h) => h.querySelector('.team-voice-media') as HTMLElement);
    const body = hosts.map((h) => h.querySelector('.team-voice-body') as HTMLElement);
    const imageLeftOfText = (i: number) =>
      media[i].getBoundingClientRect().left < body[i].getBoundingClientRect().left;
    await expect(imageLeftOfText(0)).toBe(true);
    await expect(imageLeftOfText(1)).toBe(false);
    await expect(imageLeftOfText(2)).toBe(true);
  },
};
