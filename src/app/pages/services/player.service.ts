import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { NewCareer } from '../../models/career/new-career';
import { Player } from '../../models/player/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  #http = inject(HttpClient);
  #apiUrl = environment.CREATE_CAREER_URL;

  constructor() {}

  #setCareers = signal<NewCareer[] | null>(null);
  get getCareers() {
    return this.#setCareers.asReadonly();
  }

  httpCreatePlayerByCareer$(
    careerId: string,
    player: Player,
    typeSeason: string
  ): Observable<Player> {
    return this.#http
      .post<Player>(`${this.#apiUrl}/${careerId}/${typeSeason}`, player)
      .pipe(
        shareReplay(),
        tap((res) => {
          console.log(res);
        })
      );
  }
}
