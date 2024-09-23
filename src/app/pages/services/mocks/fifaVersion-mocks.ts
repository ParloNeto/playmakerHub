export const fifaVersionMock: string[] = [
  'FIFA 16',
  'FIFA 17',
  'FIFA 18',
  'FIFA 19',
  'FIFA 20',
  'FIFA 21',
  'FIFA 22',
  'FIFA 23',
];

export function getInitialSeasonByFIFAVersion(fifaVersion: string) {
  switch (fifaVersion) {
    case 'FIFA 15':
      return 'Temporada 14/15';
    case 'FIFA 16':
      return 'Temporada 15/16';
    case 'FIFA 17':
      return 'Temporada 16/17';
    case 'FIFA 18':
      return 'Temporada 17/18';
    case 'FIFA 19':
      return 'Temporada 18/19';
    case 'FIFA 20':
      return 'Temporada 19/20';
    case 'FIFA 21':
      return 'Temporada 20/21';
    case 'FIFA 22':
      return 'Temporada 21/22';
    case 'FIFA 23':
      return 'Temporada 22/23';
    case 'EA FC 24':
      return 'Temporada 24/25';
    case 'EA FC 25':
      return 'Temporada 25/26';
    default:
      return 'Versão do FIFA não existente';
  }
}
