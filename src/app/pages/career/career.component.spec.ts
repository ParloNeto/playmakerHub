
import { CareerComponent } from './career.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CareerComponent', () => {
  let component: CareerComponent;
  let fixture: ComponentFixture<CareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerComponent, HttpClientTestingModule, RouterModule.forRoot([
        { path: '', component: HomeComponent },
        { path: 'career/:id', component: CareerComponent },
      ]),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
