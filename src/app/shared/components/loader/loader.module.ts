import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderComponent,
    NgxSpinnerModule,
  ],
  exports: [
    NgxSpinnerModule,
    LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoaderModule { }
