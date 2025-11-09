import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateStatisticsCareerComponent } from './create-statistics-career.component';
import { CareerService } from '../../../services/career.service';
import { SeasonService } from '../../../services/season.service';
import { ModalService } from '../../../services/modal.service';
import { mockCareer } from '../../../../shared/utils/test/mock-utils';
import { HttpErrorResponse } from '@angular/common/http';

describe('CreateStatisticsCareerComponent', () => {
  let component: CreateStatisticsCareerComponent;
  let fixture: ComponentFixture<CreateStatisticsCareerComponent>;

  let careerServiceMock: any;
  let seasonServiceMock: any;
  let modalServiceMock: any;
  let snackBarMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    careerServiceMock = jasmine.createSpyObj('CareerService', ['httpCareersById$', 'httpSeasonByCareer$']);
    seasonServiceMock = jasmine.createSpyObj('SeasonService', ['httpUpdateSeason']);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['showError']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    activatedRouteMock = {
      url: of([{ path: 'edit-statistics' }]),
      params: of({ id: '123', season: 'temporada-23-24' }),
    };

    await TestBed.configureTestingModule({
      imports: [CreateStatisticsCareerComponent, ReactiveFormsModule],
      providers: [
        { provide: CareerService, useValue: careerServiceMock },
        { provide: SeasonService, useValue: seasonServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStatisticsCareerComponent);
    component = fixture.componentInstance;

    careerServiceMock.httpCareersById$.and.returnValue(of(mockCareer));
    careerServiceMock.httpSeasonByCareer$.and.returnValue(of({
      id:"673153326f1c766801b16d12",
      seasonName:"temporada-23-24"
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and update the season', async () => {
    seasonServiceMock.httpUpdateSeason.and.returnValue(Promise.resolve());

    component.formStatistics.setValue({
      games: 12,
      wins: 6,
      draws: 3,
      losses: 3,
      goalsConceded: 10,
      goalsScored: 18,
      titles: [],
    });

    await component.submitForm('season123');

    expect(seasonServiceMock.httpUpdateSeason).toHaveBeenCalledWith('season123', component.formStatistics.value);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/career/123/temporada-23-24');
    expect(snackBarMock.open).toHaveBeenCalledWith('Temporada atualizada com sucesso!', 'Fechar', {
      duration: 3500,
    });
  });

  it('should handle update season errors', async () => {
     const errorResponse = new HttpErrorResponse({
          error: { message: 'Erro ao atualizar a carreira' },
          status: 400,
          statusText: 'Bad Request',
        });
    seasonServiceMock.httpUpdateSeason.and.throwError(errorResponse);

    await component.updateSeason('season123', { games: 12 });

    expect(modalServiceMock.showError).toHaveBeenCalledWith(errorResponse.error.message);
  });
});
