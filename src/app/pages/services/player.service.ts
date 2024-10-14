import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';
import { NewCareer } from '../../models/career/new-career';
import { Player } from '../../models/player/player';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  #http = inject(HttpClient);
  #apiUrl = environment.CAREER_URL;
  #apiPlayerUrl = environment.PLAYERS_API_URL;

  #modalService = inject(ModalService);
  #snackBar = inject(MatSnackBar);
  #router = inject(Router);

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
        tap({
          next: () => {
            this.#router.navigateByUrl(`/career/${careerId}`);
            this.#snackBar.open('Jogador criado com sucesso!', 'Fechar', {
              duration: 3500,
            });
          }, error: (bodyErr: HttpErrorResponse) => {
            this.#modalService.showError(bodyErr.error.message);
          }
        })
      );
  }

  #setPlayerById = signal<Player | null>(null);
  get getPlayerById() {
    return this.#setPlayerById.asReadonly();
  }

  httpGetPlayerById$(id: string): Observable<Player> {
    return this.#http.get<Player>(`${this.#apiPlayerUrl}/${id}`).pipe(
      shareReplay(1),
      tap((res: Player) => {
        this.#setPlayerById.set(res);
      })
    );
  }

  // httpDeletePlayer$(playerId: string): Observable<Player> {
  //   return this.#http.delete<Player>(`${this.#apiUrl}/${careerId}`).pipe(
  //     shareReplay(),
  //     tap((res) => {
  //       console.log(`Deletado!`);
  //     })
  //   );
  // }
}
