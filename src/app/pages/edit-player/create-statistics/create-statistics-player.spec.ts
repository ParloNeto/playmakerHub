import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatisticsPlayerComponent } from './create-statistics-player.component';

describe('CreateStatisticsPlayerComponent', () => {
  let component: CreateStatisticsPlayerComponent;
  let fixture: ComponentFixture<CreateStatisticsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStatisticsPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStatisticsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
