import { ClearOnFocusDirective } from './clear-on-focus.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="wins" phubClearOnFocus />
    </form>
  `
})
class TestComponent {
  form = new FormGroup({
    wins: new FormControl(0)
  });
}

describe('ClearOnFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, ClearOnFocusDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const inputDebugElement = fixture.debugElement.query(By.css('input'));
    inputElement = inputDebugElement.nativeElement;
  });

  it('deve limpar o campo de input se o valor for 0 ao focar', () => {

    inputElement.value = "0";
    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const formControl = fixture.componentInstance.form.get('wins');
    expect(formControl?.value).toBe('' as any);
  });

  it('não deve limpar o campo se o valor for diferente de 0', () => {
    fixture.componentInstance.form.get('wins')?.setValue(5);
    fixture.detectChanges();

    inputElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    const formControl = fixture.componentInstance.form.get('wins');
    expect(formControl?.value).toBe(5);
  });
});
