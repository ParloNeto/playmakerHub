import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NewCareer } from '../../models/career/new-career';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { fifaVersionMock } from './mocks/fifaVersion-mocks';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor() {}

  $fifaVersion = of(fifaVersionMock)


  #http = inject(HttpClient);
  #apiUrl = "http://localhost:3000/newCareer";

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
      tap((res) => this.#setCareerDetails.set(res))
    );
  }

  #selectedFifaCareer = signal<string[]>([
    'FIFA 16',
    'FIFA 17',
    'FIFA 18',
    'FIFA 19',
    'FIFA 20',
    'FIFA 21',
    'FIFA 22',
    'FIFA 23',
  ]);
  get getFifaCareer() {
    return this.#selectedFifaCareer.asReadonly();
  }
}
