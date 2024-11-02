import { Directive, HostListener } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[phubClearOnFocus]',
  standalone: true
})
export class ClearOnFocusDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('focus')
  onFocus(): void {
    const control: FormControl = this.ngControl.control as FormControl;

    if (control?.value === 0) {
      control.setValue('');
    }
  }
}
