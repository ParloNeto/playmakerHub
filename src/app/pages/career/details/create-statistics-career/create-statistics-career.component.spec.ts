import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatisticsCareerComponent } from './create-statistics-career.component';

describe('CreateStatisticsCareerComponent', () => {
  let component: CreateStatisticsCareerComponent;
  let fixture: ComponentFixture<CreateStatisticsCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStatisticsCareerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStatisticsCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
