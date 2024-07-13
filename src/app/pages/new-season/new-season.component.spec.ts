import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeasonComponent } from './new-season.component';

describe('NewSeasonComponent', () => {
  let component: NewSeasonComponent;
  let fixture: ComponentFixture<NewSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSeasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
