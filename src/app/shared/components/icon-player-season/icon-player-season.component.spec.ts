import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPlayerSeasonComponent } from './icon-player-season.component';

describe('IconPlayerSeasonComponent', () => {
  let component: IconPlayerSeasonComponent;
  let fixture: ComponentFixture<IconPlayerSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPlayerSeasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPlayerSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
