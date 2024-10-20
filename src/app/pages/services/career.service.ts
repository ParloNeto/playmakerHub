import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NewCareer } from '../../models/career/new-career';
import { firstValueFrom, Observable, of, shareReplay, tap } from 'rxjs';
import { fifaVersionMock } from './mocks/fifaVersion-mocks';
import { footballLeagues } from './mocks/football-leagues';
import { FootballLeague } from '../../models/footballLeagues/footballLeagues';
import { Player } from '../../models/player/player';
import { environment } from '../../../environments/environment';
import { Season } from '../../models/career/season';
import { PlayerStats } from '../../models/player/player-stats';
import { Pageable } from '../../models/player/pageable';
import { Page } from '../../models/player/page';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  constructor() {}

  $fifaVersion = of(fifaVersionMock);

  #http = inject(HttpClient);
  #apiUrl = environment.CAREER_URL;
  #seasonApiUrl = environment.SEASONS_URL;

  async httpCareers(): Promise<NewCareer[]> {
    const careers$ = this.#http.get<NewCareer[]>(`${this.#apiUrl}`);
    const response = await firstValueFrom(careers$);
    return response;
  }

  async httpPostCareer(career: Partial<NewCareer>):  Promise<NewCareer[]> {
    const career$ = this.#http.post<NewCareer[]>(`${this.#apiUrl}`, career);
    return await firstValueFrom(career$);
  }

  #setCareerDetails = signal<NewCareer | null>(null);
  get getCareerDetails() {
    return this.#setCareerDetails.asReadonly();
  }

  httpCareersById$(id: string): Observable<NewCareer> {
    return this.#http.get<NewCareer>(`${this.#apiUrl}/${id}`).pipe(
      shareReplay(1),
      tap((res) => {
        this.#setCareerDetails.set(res);
      })
    );
  }

  #setSeasons = signal<Season[] | null>(null);
  get getAllSeasonsByCareer() {
    return this.#setSeasons.asReadonly();
  }

  httpSeasonsByCareer$(idCareer: string): Observable<Season[]> {
    return this.#http
      .get<Season[]>(`${this.#apiUrl}/${idCareer}/seasons`)
      .pipe(
        shareReplay(1),
        tap((res: Season[]) => {
          this.#setSeasons.set(res);
        })
      );
  }

  #setPlayersFromCareer = signal<Player[] | null>(null);
  get getPlayersFromCareer() {
    return this.#setPlayersFromCareer.asReadonly();
  }

  httpPlayersOfCareersGeralById$(careerId: string): Observable<Player[]> {
    return this.#http.get<Player[]>(`${this.#apiUrl}/${careerId}/players`).pipe(
      shareReplay(),
      tap((res: Player[]) => {
        this.#setPlayersFromCareer.set(res);
        console.log(res);
      })
    );
  }

  #setPlayersFromCareerFilteredBySeason = signal<Player[] | null>(null);
  get getPlayersFromCareerFilteredBySeason() {
    return this.#setPlayersFromCareerFilteredBySeason.asReadonly();
  }

  httpPlayersFilteredBySeason$(
    careerId: string,
    typeSeason: string
  ): Observable<Player[]> {
    return this.#http
      .get<Player[]>(`${this.#apiUrl}/${careerId}/${typeSeason}`)
      .pipe(
        shareReplay(),
        tap((res: Player[]) => {
          this.#setPlayersFromCareerFilteredBySeason.set(res);
          console.log(res);
        })
      );
  }

  httpUpdatePlayerToSeason$(
    careerId: string,
    playerId: string,
    season: Season
  ): Observable<Player[]> {
    return this.#http
      .put<Player[]>(`${this.#apiUrl}/${careerId}/${playerId}`, season)
      .pipe(
        shareReplay()
      );
  }

  #setAvailablePlayersForSeason = signal<Player[] | null>(null);
  get getAvailablePlayersForSeason() {
    return this.#setAvailablePlayersForSeason.asReadonly();
  }

  httpGetAvailablePlayersForSeason$(
    careerId: string,
    seasonName: string
  ): Observable<Player[]> {
    return this.#http
      .get<Player[]>(`${this.#apiUrl}/${careerId}/${seasonName}/available`)
      .pipe(
        shareReplay(),
        tap((res: Player[]) => {
          this.#setAvailablePlayersForSeason.set(res);
          console.log(res);
        })
      );
  }

  // httpPostCareer$(career: NewCareer): Observable<NewCareer> {
  //   return this.#http.post<NewCareer>(`${this.#apiUrl}`, career).pipe(
  //     shareReplay(),
  //     tap((res) => {})
  //   );
  // }

  httpPostSeasonByCareerId$(
    season: Season,
    careerId: string
  ): Observable<Season> {
    return this.#http
      .post<Season>(`${this.#apiUrl}/${careerId}/seasons`, season)
      .pipe(
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


  #setSeasonByInitialSeason = signal<string>('');
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

  async httpGetPlayersTopByGoals(idCareer: string, pageable: Pageable): Promise<Page<PlayerStats>> {

    let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString());

    const playersTopByGoals$ = this.#http.get<Page<PlayerStats>>(`${environment.CAREER_URL}/${idCareer}/statistics/goals`, {
      params
    });
    return await firstValueFrom(playersTopByGoals$);
  }

  async httpGetPlayersTopByAssists(idCareer: string, pageable: Pageable): Promise<Page<PlayerStats>> {

    let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString());

    const playersTopByAssists$ = this.#http.get<Page<PlayerStats>>(`${environment.CAREER_URL}/${idCareer}/statistics/assists`, {
      params
    });
    return await firstValueFrom(playersTopByAssists$);
  }

  async httpFootballLeagues(): Promise<FootballLeague[]> {
    const footballLeagues$ = this.#http.get<FootballLeague[]>(environment.LEAGUES_API_URL);
    return await firstValueFrom(footballLeagues$);
  }
  async httpVersionFifa(): Promise<string[]> {
    const versionsFifa$ = this.#http.get<string[]>(environment.CREATE_FIFAVERSION_URL);
    return await firstValueFrom(versionsFifa$);
  }

}
