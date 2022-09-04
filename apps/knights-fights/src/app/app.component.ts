import { Component } from '@angular/core';
import { NotifyService } from '@knights-fights/ui';

@Component({
  selector: 'knights-fights-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private notify: NotifyService) {}

}
