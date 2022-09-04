import { Component } from '@angular/core';
import { NotifyService } from '@knights-fights/ui';

@Component({
  selector: 'knights-fights-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private notify: NotifyService) {}

  appNotify() {
    setTimeout(() => {
      this.notify.success('Yay!');
    }, 10);

    setTimeout(() => {
      this.notify.warning('Hey...');
    }, 1000);

    setTimeout(() => {
      this.notify.error('No way!');
    }, 1500);}
}
