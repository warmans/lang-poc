import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormatInputComponent} from './component/format-input/format-input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FormatInputComponent],
  exports: [FormatInputComponent]
})
export class FormatInputModule {
}
