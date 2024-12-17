import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom, Observable, shareReplay, tap } from 'rxjs';
import { Season } from '../../models/career/season';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  #http = inject(HttpClient);
  #apiUrl = environment.SEASONS_URL;
  #getAllSeasonsUrl = environment.GET_ALL_SEASONS_URL;

  constructor() {}

  #setSeasons = signal<string[] | null>(null);
  get getSeasons() {
    return this.#setSeasons.asReadonly();
  }

  public httpGetAllSeasons(): Observable<string[]> {
    return this.#http.get<string[]>(this.#getAllSeasonsUrl).pipe(
      shareReplay(),
      tap((res: string[]) => {
        this.#setSeasons.set(res);
      })
    );
  }

  async httpUpdateSeason(seasonId: string, seasonData: Partial<Season>): Promise<Season> {
    const season$ = this.#http.put<Season>(`${this.#apiUrl}/${seasonId}`, seasonData);
    return await firstValueFrom(season$);
  }

  async httpRemovePlayerFromSeason(seasonId: string, playerId: string): Promise<Season> {
    const url = `${this.#apiUrl}/${seasonId}/remove-player/${playerId}`;
    const updatedSeason$ = this.#http.put<Season>(url, {});
    return await firstValueFrom(updatedSeason$);
  }
}
