import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPlayerBaseComponent } from './icon-player-base.component';

describe('IconPlayerBaseComponent', () => {
  let component: IconPlayerBaseComponent;
  let fixture: ComponentFixture<IconPlayerBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPlayerBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPlayerBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
