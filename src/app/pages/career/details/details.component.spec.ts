import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../../services/career.service';
import { ModalService } from '../../services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mockCareer, mockPlayer } from '../../../shared/utils/test/mock-utils';
import { Player } from '../../../models/player/player';

type SeasonName = {
  id: string;
  seasonName: string;
};

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockCareerService: jasmine.SpyObj<CareerService>;
  let mockModalService: jasmine.SpyObj<ModalService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCareerService = jasmine.createSpyObj('CareerService', [
      'httpPlayersFilteredBySeason$',
      'httpPlayersOfCareersGeralById$',
      'httpSeasonsByCareer$',
      'httpCareersById$',
      'httpSeasonByInitialSeason$',
      'httpUpdatePlayerToSeason$',
      'httpGetAvailablePlayersForSeason$',
    ]);
    mockModalService = jasmine.createSpyObj('ModalService', ['showError', 'showTransferPlayer', 'confirmTransferPlayerState']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockActivatedRoute = {
      params: of({ id: '1', season: 'temporada-23-24' }),
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent, CommonModule, FormsModule],
      providers: [
        { provide: CareerService, useValue: mockCareerService },
        { provide: ModalService, useValue: mockModalService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    mockCareerService.httpPlayersFilteredBySeason$.and.returnValue(of([mockPlayer]));
    mockCareerService.httpCareersById$.and.returnValue(of(mockCareer));
    mockCareerService.httpSeasonsByCareer$.and.returnValue(of([{ id: '1', seasonName: 'temporada-23-24' }] as SeasonName[]));
    mockCareerService.httpSeasonByInitialSeason$.and.returnValue(of({ season: 'temporada-23-24' }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct route parameters', () => {
    expect(component.id()).toBe('1');
    expect(component.season()).toBe('temporada-23-24');
  });

  it('should fetch players filtered by season if season is valid', () => {
    mockCareerService.httpPlayersFilteredBySeason$.and.returnValue(of([mockPlayer]));


    component.ngOnInit();
    expect(mockCareerService.httpPlayersFilteredBySeason$).toHaveBeenCalledWith('1', 'temporada-23-24');
  });

  it('should fetch players for "geral" season', () => {
    mockActivatedRoute.params = of({ id: '1', season: 'geral' });
    mockCareerService.httpPlayersOfCareersGeralById$.and.returnValue(of([mockPlayer]));
    component.ngOnInit();
    expect(mockCareerService.httpPlayersOfCareersGeralById$).toHaveBeenCalledWith('1');
  });

  it('should show error if season is invalid', () => {
    mockActivatedRoute.params = of({ id: '1', season: 'invalid-season' });
    component.ngOnInit();
    expect(mockModalService.showError).toHaveBeenCalledWith('Temporada não encontrada.');
  });

  it('should fetch all seasons and career details', () => {
    mockCareerService.httpSeasonsByCareer$.and.returnValue(of([]));
    mockCareerService.httpCareersById$.and.returnValue(of(mockCareer));
    component.ngOnInit();
    expect(mockCareerService.httpSeasonsByCareer$).toHaveBeenCalledWith('1');
    expect(mockCareerService.httpCareersById$).toHaveBeenCalledWith('1');
  });

  it('should add a player to the current season', () => {
    mockCareerService.httpGetAvailablePlayersForSeason$.and.returnValue(of([]));
    mockModalService.confirmTransferPlayerState.and.returnValue(of(mockPlayer));
    mockCareerService.httpUpdatePlayerToSeason$.and.returnValue(of([mockPlayer]));

    component.modalAddPlayerToActualSeason();

    expect(mockCareerService.httpGetAvailablePlayersForSeason$).toHaveBeenCalledWith('1', 'temporada-23-24');
    expect(mockCareerService.httpUpdatePlayerToSeason$).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/career/1');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Jogador adicionado com sucesso!', 'Fechar', {
      duration: 3500,
    });
  });

});
