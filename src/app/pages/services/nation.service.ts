import { Injectable, signal } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { nationsMock } from './mocks/nation-mocks';

@Injectable({
  providedIn: 'root',
})
export class NationService {
  constructor() {}

  #nation$ = of(nationsMock);

  #setNations = signal<{ nation: string }[] | null>(null);
  get getNations() {
    return this.#setNations.asReadonly();
  }

  getAllNationsMock(): Observable<{ nation: string }[]> {
    return this.#nation$.pipe(
      shareReplay(),
      tap((res) => this.#setNations.set(res))
    );
  }
}
