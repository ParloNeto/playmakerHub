import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
  standalone: true
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const value = inputElement.value;

    const formattedValue = value.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());

    inputElement.value = formattedValue;
  }

}

