import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NewCareer } from '../../models/career/new-career';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { fifaVersionMock } from './mocks/fifaVersion-mocks';
import { footballLeagues } from './mocks/football-leagues';
import { FootballLeague } from '../../models/footballLeagues/footballLeagues';
import { Player } from '../../models/player/player';
import { environment } from '../../../environments/environment';
import { Season } from '../../models/career/season';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  constructor() {}

  $fifaVersion = of(fifaVersionMock);
  $footballLeagues = of(footballLeagues);

  #http = inject(HttpClient);
  #apiUrl = environment.CREATE_CAREER_URL;

  #setCareers = signal<NewCareer[] | null>(null);
  get getCareers() {
    return this.#setCareers.asReadonly();
  }

  httpCareers$(): Observable<NewCareer[]> {
    return this.#http.get<NewCareer[]>(`${this.#apiUrl}`).pipe(
      shareReplay(),
      tap((res) => this.#setCareers.set(res))
    );
  }

  #setCareerDetails = signal<NewCareer | null>(null);
  get getCareerDetails() {
    return this.#setCareerDetails.asReadonly();
  }

  httpCareersById$(id: string): Observable<NewCareer> {
    return this.#http.get<NewCareer>(`${this.#apiUrl}/${id}`).pipe(
      shareReplay(),
      tap((res) => {
        this.#setCareerDetails.set(res);
      })
    );
  }

  #setPlayersOfCareersGeral = signal<Player[] | null>(null);
  get getPlayersOfCareersGeral() {
    return this.#setPlayersOfCareersGeral.asReadonly();
  }

  httpPlayersOfCareersGeralById$(careerId: string): Observable<Player[]> {
    return this.#http.get<Player[]>(`${this.#apiUrl}/${careerId}/players`).pipe(
      shareReplay(),
      tap((res: Player[]) => {
        this.#setPlayersOfCareersGeral.set(res);
        console.log(res)
      })
    );
  }

  #setPlayerCareerDetails = signal<Player[] | null>(null);
  get getPlayerCareerDetails() {
    return this.#setCareerDetails.asReadonly();
  }

  httpPostCareer$(career: NewCareer): Observable<NewCareer> {
    return this.#http.post<NewCareer>(`${this.#apiUrl}`, career).pipe(
      shareReplay(),
      tap((res) => {})
    );
  }

  httpPostSeasonByCareerId$(season: Season, careerId: string): Observable<Season> {
    return this.#http.post<Season>(`${this.#apiUrl}/${careerId}/seasons`, season).pipe(
      shareReplay(),
      tap((res) => {})
    );
  }

  httpDeleteCareer$(careerId: string): Observable<NewCareer> {
    return this.#http.delete<NewCareer>(`${this.#apiUrl}/${careerId}`).pipe(
      shareReplay(),
      tap((res) => {
        console.log(`Deletado!`);
      })
    );
  }

  // httpPlayersCareersById$(id: string): Observable<NewCareer> {
  //   return this.#http.get<NewCareer>(`${this.#apiUrl}/${id}`).pipe(
  //     shareReplay(),
  //     tap((res) => {
  //       this.#setPlayerCareerDetails.set(res.players)
  //       console.log(res.players)
  //     })
  //   );
  // }

  #setFifaCareer = signal<string[] | null>(null);
  get getFifaCareer() {
    return this.#setFifaCareer.asReadonly();
  }

  httpVersionFifa$(): Observable<string[]> {
    return this.#http.get<string[]>(environment.CREATE_FIFAVERSION_URL).pipe(
      shareReplay(),
      tap((res) => this.#setFifaCareer.set(res))
    );
  }

  #setSeasonByInitialSeason = signal<string | null>(null);
  get getSeasonByInitialSeason() {
    return this.#setSeasonByInitialSeason.asReadonly();
  }

  httpSeasonByInitialSeason$(version: string): Observable<{ season: string }> {
    return this.#http
      .get<{ season: string }>(
        `${environment.CREATE_FIFAVERSION_URL}/initialSeason`,
        {
          params: {
            version: `${version}`,
          },
        }
      )
      .pipe(
        shareReplay(),
        tap((res) => this.#setSeasonByInitialSeason.set(res.season))
      );
  }

  #setFootballLeagues = signal<FootballLeague[] | null>(null);
  get getFootballLeagues() {
    return this.#setFootballLeagues.asReadonly();
  }

  httpFootballLeagues$(): Observable<FootballLeague[]> {
    return this.$footballLeagues.pipe(
      shareReplay(),
      tap((res) => this.#setFootballLeagues.set(res))
    );
  }
}
