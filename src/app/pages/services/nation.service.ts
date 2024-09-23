import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable, of, shareReplay, tap } from 'rxjs';
import { nationsMock } from './mocks/nation-mocks';

@Injectable({
  providedIn: 'root',
})
export class NationService {
  constructor() {}

  #setNations = signal<{ nation: string }[] | null>(null);
  get getNations() {
    return this.#setNations.asReadonly();
  }

  // getAllNationsMock(): Observable<{ nation: string }[]> {
  //   return this.#nation$.pipe(
  //     shareReplay(),
  //     tap((res) => this.#setNations.set(res))
  //   );
  // }

  async getAllNationsMock(): Promise<{ nation: string }[]> {
    const nation$ = of(nationsMock);
    return await firstValueFrom(nation$);
  }
}
