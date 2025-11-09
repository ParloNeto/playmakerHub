// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { of } from 'rxjs';
// import { EditPlayerComponent } from './edit-player.component';
// import { PlayerService } from '../services/player.service';
// import { CareerService } from '../services/career.service';
// import { SeasonService } from '../services/season.service';
// import { ModalService } from '../services/modal.service';
// import { ChangeDetectorRef } from '@angular/core';

// describe('EditPlayerComponent', () => {
//   let component: EditPlayerComponent;
//   let fixture: ComponentFixture<EditPlayerComponent>;

//   let careerServiceMock = jasmine.createSpyObj('CareerService', ['httpCareersById$', 'httpSeasonByCareer$']);
//   let seasonServiceMock = jasmine.createSpyObj('SeasonService', ['httpUpdateSeason']);;
//   let playerServiceMock = jasmine.createSpyObj('PlayerService', ['httpGetPlayerById$', 'httpFindPlayerStatisticsBySeason$']);
//   let modalServiceMock  = jasmine.createSpyObj('ModalService', ['showError']);
//   let snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
//   let routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
//   let activatedRouteMock: any;
//   const mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
//   const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
//   const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

//   beforeEach(async () => {

//     activatedRouteMock = {
//       url: of([{ path: 'edit-statistics' }]),
//       params: of({ id: '123', season: 'temporada-23-24' }),
//     };


//     await TestBed.configureTestingModule({
//       imports: [EditPlayerComponent],
//       providers: [
//         { provide: PlayerService, useValue: playerServiceMock },
//         { provide: CareerService, useValue: careerServiceMock },
//         { provide: SeasonService, useValue: seasonServiceMock },
//         { provide: ModalService, useValue: modalServiceMock },
//         { provide: ActivatedRoute, useValue: activatedRouteMock },
//         { provide: Router, useValue: mockRouter },
//         { provide: MatSnackBar, useValue: mockSnackBar },
//         { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(EditPlayerComponent);
//     component = fixture.componentInstance;
//     playerServiceMock.
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
