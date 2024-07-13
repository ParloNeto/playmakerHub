import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top3StatsPlayersCareerComponent } from './top-3-stats-players-career.component';

describe('Top3StatsPlayersCareerComponent', () => {
  let component: Top3StatsPlayersCareerComponent;
  let fixture: ComponentFixture<Top3StatsPlayersCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top3StatsPlayersCareerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top3StatsPlayersCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
