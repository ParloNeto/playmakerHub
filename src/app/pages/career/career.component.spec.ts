import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { CareerComponent } from './career.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CareerService } from '../services/career.service';
import { ModalService } from '../services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mockCareer } from '../../shared/utils/test/mock-utils';

describe('CareerComponent', () => {
  let component: CareerComponent;
  let fixture: ComponentFixture<CareerComponent>;
  let careerService: CareerService;
  let modalService: ModalService;
  let snackBar: MatSnackBar;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: '123' }) },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CareerComponent);
    component = fixture.componentInstance;
    careerService = TestBed.inject(CareerService);
    modalService = TestBed.inject(ModalService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve chamar os serviços necessários na inicialização', () => {
      spyOn(careerService, 'httpSeasonsByCareer$').and.returnValue(of([]));
      spyOn(careerService, 'httpCareersById$').and.returnValue(
        of({ fifaCareer: 'FIFA 21' } as any)
      );
      spyOn(careerService, 'httpSeasonByInitialSeason$').and.returnValue(of({season: "temporada-23-24"}));

      component.ngOnInit();

      expect(careerService.httpSeasonsByCareer$).toHaveBeenCalledWith('123');
      expect(careerService.httpCareersById$).toHaveBeenCalledWith('123');
      expect(careerService.httpSeasonByInitialSeason$).toHaveBeenCalledWith('FIFA 21');
    });
  });

  describe('formatSeason', () => {
    it('deve formatar a temporada corretamente', () => {
      const formatted = component.formatSeason('FIFA 17');
      expect(formatted).toBe('temporada-16-17');
    });
  });

  describe('deleteCareer', () => {
    it('deve navegar para /home e exibir mensagem ao deletar carreira', fakeAsync(() => {
      spyOn(careerService, 'httpDeleteCareer$').and.returnValue(of(mockCareer));
      spyOn(snackBar, 'open');

      component.deleteCareer();

      tick();

      expect(careerService.httpDeleteCareer$).toHaveBeenCalledWith('123');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
      expect(snackBar.open).toHaveBeenCalledWith(
        'Carreira removida com sucesso!',
        'Fechar',
        { duration: 3500 }
      );
    }));

    it('deve tratar erros ao deletar carreira', fakeAsync(() => {
      spyOn(careerService, 'httpDeleteCareer$').and.returnValue(throwError(() => new Error('Erro')));
      spyOn(snackBar, 'open');

      component.deleteCareer();

      tick();

      expect(snackBar.open).not.toHaveBeenCalledWith('Carreira removida com sucesso!', 'Fechar', { duration: 3500 });
    }));
  });

  describe('openModalConfirmation', () => {
    it('deve chamar o modal de confirmação', () => {
      spyOn(modalService, 'showConfirmation');
      spyOn(modalService, 'confirmState').and.returnValue(of(true));
      spyOn(component, 'deleteCareer');

      component.openModalConfirmation();

      expect(modalService.showConfirmation).toHaveBeenCalledWith(
        'Atenção!',
        'Tem certeza que deseja deletar essa carreira?',
        'Sim',
        'Não'
      );
      expect(component.deleteCareer).toHaveBeenCalled();
    });

    it('não deve deletar a carreira se o usuário cancelar', () => {
      spyOn(modalService, 'confirmState').and.returnValue(of(false));
      spyOn(component, 'deleteCareer');

      component.openModalConfirmation();

      expect(component.deleteCareer).not.toHaveBeenCalled();
    });
  });
});
