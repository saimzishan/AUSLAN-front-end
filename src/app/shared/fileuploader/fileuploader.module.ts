import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [FileUploadModule,
    CommonModule],
  exports: [FileUploadModule],
  declarations: []
})
export class FileuploaderModule { }
