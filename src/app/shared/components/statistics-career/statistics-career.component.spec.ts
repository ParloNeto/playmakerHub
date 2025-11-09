import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCareerComponent } from './statistics-career.component';

describe('StatisticsCareerComponent', () => {
  let component: StatisticsCareerComponent;
  let fixture: ComponentFixture<StatisticsCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsCareerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
