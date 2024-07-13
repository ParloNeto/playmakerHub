
import { Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((p) => p.HomeComponent),
  },
  {
    path: 'career',
    title: 'Ver detalhes da Carreira - Playmaker Hub',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./career/career.component').then((p) => p.CareerComponent),
      },
      {
        path: ':id/:season',
        loadComponent: () =>
          import('./career/details/details.component').then((p) => p.DetailsComponent),
      },
      {
        path: ':id/:season/new-player',
        loadComponent: () =>
          import('./new-player/new-player.component').then((p) => p.NewPlayerComponent),
      },
      {
        path: ':id/:season/new-season',
        loadComponent: () =>
          import('./new-season/new-season.component').then((p) => p.NewSeasonComponent),
      },
    ],
  },
  {
    path: 'new-career',
    title: 'Criar Carreira - Playmaker Hub',
    loadComponent: () =>
      import('./creating-career/creating-career.component').then(
        (p) => p.CreatingCareerComponent
      ),
  },
];
