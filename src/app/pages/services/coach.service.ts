import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Coach } from '../../models/career/Coach';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor() { }

  #http = inject(HttpClient)

  async httpCreateCoach(coach: Partial<Coach>): Promise<Coach> {
    const coach$ = this.#http.post<Coach>(`${environment.CREATE_COACH_URL}`, coach);
    return await firstValueFrom(coach$);
  }
}
