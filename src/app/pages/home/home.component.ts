import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { CareerService } from '../services/career.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { NewCareer } from '../../models/career/new-career';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HeaderComponent, AsyncPipe, NgClass, ModalComponent, MatSnackBarModule, LoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{

  #careerService = inject(CareerService);
  private loading = inject(NgxSpinnerService)


  // public getCareer = this.#careerService.getCareers;
  #setCareers = signal<NewCareer[] | null>(null);
  get getCareers() {
    return this.#setCareers.asReadonly();
  }

  constructor(){
    this.loading.show();
    this.loadCareers()
      .then(() => {
        console.log(`All careers loaded:`, this.getCareers())
        this.loading.hide();
      });

  }

  ngOnInit(): void {

    // this.#careerService.httpCareers$()
    // .pipe(finalize(() => this.loading.hide()))
    // .subscribe();


  }

  async loadCareers() {
    try {
      const careers = await this.#careerService.httpCareers();
      this.#setCareers.set(careers);
    }
    catch(err) {
      console.error(err);
    }
  }

  public careerExists(data: NewCareer[]): string {
    if (data) {
      return "top";
    }
    return "";
  }
}
