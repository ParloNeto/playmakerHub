import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatingCareerComponent } from './pages/creating-career/creating-career.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home - Playmaker Hub',
    loadChildren: () =>
      import('./pages/pages.routes').then((p) => p.PAGES_ROUTES),
  }
];
