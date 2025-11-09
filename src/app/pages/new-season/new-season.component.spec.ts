// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NewSeasonComponent } from './new-season.component';
// import { CareerService } from '../services/career.service';
// import { SeasonService } from '../services/season.service';
// import { ModalService } from '../services/modal.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { mockCareer, mockSeason } from '../../shared/utils/test/mock-utils';

// fdescribe('NewSeasonComponent', () => {
//   let component: NewSeasonComponent;
//   let fixture: ComponentFixture<NewSeasonComponent>;

//   const mockCareerService = {
//     getCareerDetails: jasmine.createSpy('getCareerDetails').and.returnValue(of(mockCareer)),
//     httpCareersById$: jasmine.createSpy('httpCareersById$').and.returnValue(of(mockCareer)),
//     httpPostSeasonByCareerId$: jasmine.createSpy('httpPostSeasonByCareerId$').and.returnValue(of(mockSeason)),
//   };

//   const mockSeasonService = {
//     getSeasons: jasmine.createSpy('getSeasons').and.returnValue(of(['Temporada 23/24', 'Temporada 21/22'])),
//     httpGetAllSeasons: jasmine.createSpy('httpGetAllSeasons').and.returnValue(of(['Temporada 23/24', 'Temporada 21/22'])),
//   };

//   const mockModalService = {
//     showError: jasmine.createSpy('showError'),
//   };

//   const mockSnackBar = {
//     open: jasmine.createSpy('open'),
//   };

//   const mockRouter = {
//     navigateByUrl: jasmine.createSpy('navigateByUrl'),
//   };

//   const mockActivatedRoute = {
//     params: of({ id: '123' }),
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [NewSeasonComponent],
//       providers: [
//         { provide: CareerService, useValue: mockCareerService },
//         { provide: SeasonService, useValue: mockSeasonService },
//         { provide: ModalService, useValue: mockModalService },
//         { provide: MatSnackBar, useValue: mockSnackBar },
//         { provide: Router, useValue: mockRouter },
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(NewSeasonComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();

//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call CareerService.httpCareersById$ on initialization', () => {
//     component.ngOnInit();
//     expect(mockCareerService.httpCareersById$).toHaveBeenCalledWith('123');
//   });

//   it('should call SeasonService.httpGetAllSeasons on initialization', () => {
//     component.ngOnInit();

//     expect(mockSeasonService.httpGetAllSeasons).toHaveBeenCalled();
//   });

//   it('should navigate to career page on successful form submission', () => {
//     component.formSeason.setValue({
//       seasonName: 'Season 1',
//       games: 10,
//       wins: 5,
//       draws: 3,
//       losses: 2,
//       goalsConceded: 10,
//       goalsScored: 20,
//     });

//     component.submitForm();

//     expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('career/123');
//     expect(mockSnackBar.open).toHaveBeenCalledWith('Temporada criada com sucesso!', 'Fechar', {
//       duration: 3500,
//     });
//   });
// });
