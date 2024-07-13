import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../../models/career/Coach';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor() { }

  #http = inject(HttpClient)

  createCoach(coach: Coach): Observable<Coach> {
    return this.#http.post<Coach>(`${environment.CREATE_COACH_URL}`, coach);
  }
}
