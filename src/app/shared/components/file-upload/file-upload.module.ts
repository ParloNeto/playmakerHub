import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { UploadFileService } from '../../../pages/services/upload-file.service';



@NgModule({
  declarations: [],
  imports: [
    FileUploadComponent,
  ],
  exports: [
    FileUploadComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FileUploadModule { }
