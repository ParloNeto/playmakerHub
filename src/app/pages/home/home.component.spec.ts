import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { CareerService } from '../services/career.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { mockListCareer } from '../../shared/utils/test/mock-utils';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let careerService: jasmine.SpyObj<CareerService>;

  beforeEach(waitForAsync(() => {
    const careerServiceSpy = jasmine.createSpyObj('CareerService', ['httpCareers']);

    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        LoaderModule,
        HomeComponent,
      ],
      providers: [
        { provide: CareerService, useValue: careerServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => 'mockValue' } },
            queryParams: of({}),
            params: of({ id: '123' }),
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        careerService = TestBed.inject(CareerService) as jasmine.SpyObj<CareerService>;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call httpCareers and set careers', async () => {
    const mockCareers = [{ id: 1, name: 'Career 1' }];
    careerService.httpCareers.and.returnValue(Promise.resolve(mockListCareer));

    await component.loadCareers();
    expect(careerService.httpCareers).toHaveBeenCalled();
    expect(component.getCareers()).toEqual(mockListCareer);
  });

  it('should return "top" when careers exist', () => {
    const result = component.careerExists([mockListCareer[0]]);
    expect(result).toBe('top');
  });

  it('should return empty string when careers do not exist', () => {
    const result = component.careerExists();
    expect(result).toBe('');
  });
});
export { HomeComponent };

