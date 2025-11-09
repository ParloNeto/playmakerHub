import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStatisticsPlayerComponent } from './create-statistics-player.component';
import { PlayerService } from '../../services/player.service';
import { ModalService } from '../../services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Statistics } from '../../../models/player/statistics';
import { mockPlayer } from '../../../shared/utils/test/mock-utils';

describe('CreateStatisticsPlayerComponent', () => {
  let component: CreateStatisticsPlayerComponent;
  let fixture: ComponentFixture<CreateStatisticsPlayerComponent>;
  let playerServiceMock: jasmine.SpyObj<PlayerService>;
  let modalServiceMock: jasmine.SpyObj<ModalService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let routerMock: jasmine.SpyObj<Router>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    playerServiceMock = jasmine.createSpyObj('PlayerService', [
      'httpGetPlayerById$',
      'httpCreateStatisticsSeasonPlayer$',
      'httpUpdateStatisticsSeasonPlayer$',
      'httpFindPlayerStatisticsBySeason$',
    ]);
    modalServiceMock = jasmine.createSpyObj('ModalService', ['showError']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    activatedRouteMock = {
      url: of([{ path: 'new-statistics' }]) as any,
      params: of({ id: '123', season: 'temporada-23-24' }),
    };

    await TestBed.configureTestingModule({
      imports: [CreateStatisticsPlayerComponent, ReactiveFormsModule],
      providers: [
        { provide: PlayerService, useValue: playerServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStatisticsPlayerComponent);
    component = fixture.componentInstance;
    playerServiceMock.httpGetPlayerById$.and.returnValue(of(mockPlayer));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and signals on ngOnInit', () => {
    expect(component.formStatistics).toBeDefined();
    expect(component.season()).toBe('temporada-23-24');
    expect(component.id()).toBe('123');
    expect(component.pathAlias()).toBe('create');
  });

  it('should submit form and create statistics when pathAlias is create', () => {
    const mockData = { matches: 10, goals: 5, assists: 3, yellowCards: 1, redCards: 0, contractedAtualSeason: false };
    playerServiceMock.httpCreateStatisticsSeasonPlayer$.and.returnValue(of({} as Statistics));

    component.formStatistics.setValue({ season: 'temporada-23-24', ...mockData });
    component.submitForm();

    expect(playerServiceMock.httpCreateStatisticsSeasonPlayer$).toHaveBeenCalledWith('123', { season: 'temporada-23-24', ...mockData });
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/career/673153326f1c766801b16d13/temporada-23-24/123/edit-player');
    expect(snackBarMock.open).toHaveBeenCalledWith('Estatísticas criadas com sucesso!', 'Fechar', { duration: 3500 });
  });

  it('should handle errors during form submission when creating statistics', () => {
    const errorResponse = { error: { message: 'Error message' } };
    playerServiceMock.httpCreateStatisticsSeasonPlayer$.and.returnValue(throwError(() => errorResponse));

    component.formStatistics.setValue({ season: 'temporada-23-24', matches: 10, goals: 5, assists: 3, yellowCards: 1, redCards: 0, contractedAtualSeason: false });
    component.submitForm();

    expect(modalServiceMock.showError).toHaveBeenCalledWith('Error message');
  });

  it('should fetch and patch player statistics when pathAlias is edit', () => {
    activatedRouteMock.url = of([{ path: 'edit-statistics' }]) as any;
    playerServiceMock.httpFindPlayerStatisticsBySeason$.and.returnValue(of({
      season: "temporada-16-17",
      matches: 10,
      goals: 5,
      assists: 3,
      yellowCards: 0,
      redCards: 0,
    }));

    component.ngOnInit();

    expect(playerServiceMock.httpFindPlayerStatisticsBySeason$).toHaveBeenCalledWith('123', 'temporada-23-24');
    expect(component.formStatistics.value).toEqual({
      season: 'temporada-23-24',
      matches: 10,
      goals: 5,
      assists: 3,
      yellowCards: 0,
      redCards: 0,
      contractedAtualSeason: false,
    });
  });
});
