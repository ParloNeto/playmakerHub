import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { NewCareer } from '../../models/career/new-career';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor() {}

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
}
