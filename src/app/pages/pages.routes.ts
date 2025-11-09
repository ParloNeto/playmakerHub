import { CreateStatisticsCareerComponent } from './career/details/create-statistics-career/create-statistics-career.component';
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
        path: ':id/:season/edit-statistics',
        loadComponent: () =>
          import('./career/details/create-statistics-career/create-statistics-career.component').then((p) => p.CreateStatisticsCareerComponent),
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
      {
        path: ':id/:season/:id/edit-player',
        loadComponent: () =>
          import('./edit-player/edit-player.component').then((p) => p.EditPlayerComponent),
      },
      {
        path: ':id/:season/:id/edit-player/new-statistics',
        loadComponent: () =>
          import('./edit-player/create-statistics/create-statistics-player.component').then((p) => p.CreateStatisticsPlayerComponent),
      },
      {
        path: ':id/:season/:id/edit-player/edit-statistics',
        loadComponent: () =>
          import('./edit-player/create-statistics/create-statistics-player.component').then((p) => p.CreateStatisticsPlayerComponent),
      },
    ],
  },
  {
    path: 'new-career',
    title: 'Criar Carreira - Playmaker Hub',
    loadComponent: () =>
      import('./new-career/new-career.component').then(
        (p) => p.NewCareerComponent
      ),
  },
];
