import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DebugElement } from '@angular/core';
import { CareerService } from '../services/career.service';

fdescribe('HomeComponent', () => {
  let component:HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let careerService: any;

  beforeEach(waitForAsync(() => {

    const careerServiceSpy = jasmine.createSpyObj('CareerService', ['httpCareers'])

    TestBed.configureTestingModule({
        imports: [
        ],
        providers: [
            {provide: CareerService, useValue: careerServiceSpy}
        ]
    }).compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            careerService = TestBed.inject(CareerService);
        });

}));

it("should create the component", () => {

  expect(component).toBeTruthy();

});
});

