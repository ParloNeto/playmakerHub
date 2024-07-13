import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  #http = inject(HttpClient);
  #apiUrl = environment.GET_SEASONS_URL;

  constructor() {}

  #setSeasons = signal<string[] | null>(null);
  get getSeasons() {
    return this.#setSeasons.asReadonly();
  }

  public httpGetAllSeasons(): Observable<string[]> {
    return this.#http.get<string[]>(this.#apiUrl).pipe(
      shareReplay(),
      tap((res: string[]) => {
        this.#setSeasons.set(res);
      })
    );
  }
}
