import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingCareerComponent } from './creating-career.component';

describe('CreatingCareerComponent', () => {
  let component: CreatingCareerComponent;
  let fixture: ComponentFixture<CreatingCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatingCareerComponent]
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
