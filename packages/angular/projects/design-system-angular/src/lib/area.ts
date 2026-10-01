/**
 * Die vier Markenbereiche des Conciso Design Systems. Sie steuern in der CSS-Schicht
 * die Bereichsfarben (Tokens --co-* / --ki-* / --es-* / --wo-*) und werden je nach
 * Komponente entweder über eine Modifier-Klasse (z. B. .btn-co) oder ein
 * data-area-Attribut (z. B. .badge[data-area="co"]) angewandt.
 */
export type CdsArea = 'co' | 'ki' | 'es' | 'wo';

export const CDS_AREAS: CdsArea[] = ['co', 'ki', 'es', 'wo'];

export const CDS_AREA_LABELS: Record<CdsArea, string> = {
  co: 'Corporate',
  ki: 'AI.Applied',
  es: 'Effektive Software',
  wo: 'Wirksame Organisationen',
};
