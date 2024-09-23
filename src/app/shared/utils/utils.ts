export class StringUtils {

}

export function transformSeasonString(input: string): string {
  const parts = input.split('-');

  if (
    parts.length !== 3 ||
    parts[0].toLowerCase() !== 'temporada' ||
    isNaN(Number(parts[1])) ||
    isNaN(Number(parts[2]))
  ) {
    throw new Error('Formato inválido');
  }

  const season = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const year1 = parts[1];
  const year2 = parts[2];

  return `${season} ${year1}/${year2}`;
}
