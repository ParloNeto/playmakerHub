import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsPlayerComponent } from './statistics-player.component';

describe('StatisticsPlayerComponent', () => {
  let component: StatisticsPlayerComponent;
  let fixture: ComponentFixture<StatisticsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
