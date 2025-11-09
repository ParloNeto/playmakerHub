import { TestBed, ComponentFixture, tick } from '@angular/core/testing';
import { NewCareerComponent } from './new-career.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CareerService } from '../services/career.service';
import { NationService } from '../services/nation.service';
import { ModalService } from '../services/modal.service';
import { mockCareer, mockLeague } from '../../shared/utils/test/mock-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('NewCareerComponent', () => {
  let component: NewCareerComponent;
  let fixture: ComponentFixture<NewCareerComponent>;
  let mockCareerService: jasmine.SpyObj<CareerService>;
  let mockNationService: jasmine.SpyObj<NationService>;
  let mockModalService: jasmine.SpyObj<ModalService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;


  beforeEach(async () => {
    mockCareerService = jasmine.createSpyObj('CareerService', [
      'httpPostCareer',
      'httpVersionFifa',
      'httpFootballLeagues',
    ]);
    mockNationService = jasmine.createSpyObj('NationService', ['getAllNationsMock']);
    mockModalService = jasmine.createSpyObj('ModalService', ['showError']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [NewCareerComponent, ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CareerService, useValue: mockCareerService },
        { provide: NationService, useValue: mockNationService },
        { provide: ModalService, useValue: mockModalService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        {
                  provide: ActivatedRoute,
                  useValue: {
                    snapshot: { paramMap: { get: (key: string) => 'mockValue' } },
                    queryParams: of({}),
                    params: of({ id: '123' }),
                  },
                },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve inicializar formulários corretamente', () => {
    expect(component.formCreatingCareer).toBeDefined();
    expect(component.formCreatingCoach).toBeDefined();
  });

  it('deve carregar dados iniciais ao inicializar', async () => {
    mockCareerService.httpVersionFifa.and.returnValue(Promise.resolve(['fifa-16', 'fifa-17']));
    mockNationService.getAllNationsMock.and.returnValue(Promise.resolve([{ nation: 'Brazil' }]));
    mockCareerService.httpFootballLeagues.and.returnValue(Promise.resolve([mockLeague]));

    await component.ngOnInit();

    expect(mockCareerService.httpVersionFifa).toHaveBeenCalled();
    expect(mockNationService.getAllNationsMock).toHaveBeenCalled();
    expect(mockCareerService.httpFootballLeagues).toHaveBeenCalled();
  });

  it('deve validar formulários corretamente', () => {
    component.formCreatingCareer.setValue({
      fifaCareer: 'fifa-21',
      leagueCareer: 'Premier League',
      teamCareer: 'Chelsea',
    });

    component.formCreatingCoach.setValue({
      coachesName: 'John Doe',
      nationality: 'English',
      urlImageCoach: '',
      seasons: 1,
    });

    expect(component.formCreatingCareer.valid).toBeTrue();
    expect(component.formCreatingCoach.valid).toBeTrue();
  });

  it('deve exibir mensagem de erro ao enviar formulário inválido', async () => {

    const errorResponse = new HttpErrorResponse({
      error: { message: 'Erro ao criar a carreira' },
      status: 400,
      statusText: 'Bad Request',
    });

    mockCareerService.httpPostCareer.and.returnValue(Promise.reject(errorResponse));

    component.formCreatingCoach.setValue({
      coachesName: 'Jurgen Klopp',
      nationality: 'Germany',
      urlImageCoach: '',
      seasons: 1,
    });

    component.formCreatingCareer.setValue({
      fifaCareer: 'FIFA 21',
      leagueCareer: 'Premier League',
      teamCareer: 'Chelsea',
    });

    await component.submitForm();

    expect(mockModalService.showError).toHaveBeenCalledWith("Erro ao criar a carreira");
  });

  it('deve navegar para a página inicial ao criar carreira com sucesso', async () => {
    mockCareerService.httpPostCareer.and.returnValue(Promise.resolve([mockCareer]));

    component.formCreatingCareer.setValue({
      fifaCareer: 'FIFA 21',
      leagueCareer: 'Premier League',
      teamCareer: 'Chelsea',
    });

    component.formCreatingCoach.setValue({
      coachesName: 'Jurgen Klopp',
      nationality: 'Germany',
      urlImageCoach: '',
      seasons: 1,
    });

    await component.submitForm();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/home');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Carreira criada com sucesso!', 'Fechar', {
      duration: 3500,
    });
  });
});
