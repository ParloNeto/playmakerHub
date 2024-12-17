import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreatingCareerComponent } from './creating-career.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

fdescribe('CreatingCareerComponent', () => {
  let component: CreatingCareerComponent;
  let fixture: ComponentFixture<CreatingCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatingCareerComponent, HttpClientTestingModule, RouterModule.forRoot([
        { path: '', component: HomeComponent },
        { path: 'new-career', component: CreatingCareerComponent },
      ]),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
