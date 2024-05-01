import { CareerComponent } from './career/career.component';
import { CreatingCareerComponent } from './creating-career/creating-career.component';
import { Routes } from '@angular/router';


export const PAGES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((p) => p.HomeComponent),
  },
  {
    path: 'career/:id',
    title: 'Ver detalhes da Carreira - Playmaker Hub',
    loadComponent: () => import('./career/career.component').then((p) => p.CareerComponent),
  },
  {
    path: 'new-career',
    title: 'Criar Carreira - Playmaker Hub',
    loadComponent: () => import('./creating-career/creating-career.component').then((p) => p.CreatingCareerComponent),
  },
];
