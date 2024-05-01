import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute, Params } from '@angular/router';
import { CareerService } from '../services/career.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent implements OnInit {
  #careerService = inject(CareerService);
  activatedRoute = inject(ActivatedRoute);

  public getCareerDetails = this.#careerService.getCareerDetails;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        const id = params['id'];
        this.#careerService.httpCareersById$(id).subscribe();
      }
    })

   console.log(this.getCareerDetails())

  }
}
