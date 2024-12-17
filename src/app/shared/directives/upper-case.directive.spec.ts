// import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
// import { Component, DebugElement } from '@angular/core';
// import { UpperCaseDirective } from './upper-case.directive';
// import { By } from '@angular/platform-browser';

// @Component({
//   template: `<input type="text" appUpperCase>`
// })
// class TestComponent {}

// describe('UpperCaseDirective', () => {
//   let fixture: ComponentFixture<TestComponent>;
//   let inputEl: DebugElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [TestComponent],
//       imports:[UpperCaseDirective]
//     });
//     fixture = TestBed.createComponent(TestComponent);
//     inputEl = fixture.debugElement.query(By.css('input'));
//   });

//   it('should transform input value to uppercase', fakeAsync(() => {
//     const inputElement = inputEl.nativeElement;
//     inputElement.value = 'hello-world';
//     inputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();
//     expect(inputElement.value).toEqual('Hello World');
//   }));

//   it('should transform input value to uppercase with multiple words', fakeAsync(() => {
//     const inputElement = inputEl.nativeElement;
//     inputElement.value = 'hello-world test';
//     inputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();
//     expect(inputElement.value).toEqual('Hello World Test');
//   }));
// });
