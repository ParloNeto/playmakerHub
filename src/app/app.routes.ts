import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewCareerComponent } from './pages/new-career/new-career.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - Playmaker Hub',
    loadChildren: () =>
      import('./pages/pages.routes').then((p) => p.PAGES_ROUTES),
  }
];
