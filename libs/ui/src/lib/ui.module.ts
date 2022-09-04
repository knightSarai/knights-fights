import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NotifyComponent } from './notify/notify.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SpinnerComponent, NotifyComponent],
  exports: [SpinnerComponent, NotifyComponent],
})
export class UiModule {}
