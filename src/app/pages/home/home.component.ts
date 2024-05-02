import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { CareerService } from '../services/career.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { NewCareer } from '../../models/career/new-career';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, AsyncPipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  #careerService = inject(CareerService);

  public getCareer = this.#careerService.getCareers;

  ngOnInit(): void {
    // this.#careerService.httpCareers$().subscribe();
  }

  public careerExists(data: NewCareer[]): string {
    if (data) {
      return "top";
    }
    return "";
  }
}
