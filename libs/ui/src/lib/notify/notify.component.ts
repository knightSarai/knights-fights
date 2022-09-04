import { Component, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { NotifyService } from './notify.service';
import { NotificationType, INotify } from '@knights-fights/ui';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'knights-fights-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnInit {
  @ViewChild('notificationContainer') container: ElementRef<HTMLDivElement>;
  private _subscribed: boolean = true;
  private classMap: Map<NotificationType, string>;

  constructor(private service: NotifyService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.classMap = new Map<NotificationType, string>();
    this.classMap.set(NotificationType.Success, 'alert-success');
    this.classMap.set(NotificationType.Warning, 'alert-warning');
    this.classMap.set(NotificationType.Error, 'alert-danger');
    
    this.service.notification
        .pipe(takeWhile(() => this._subscribed))
        .subscribe(notification => {
            if(notification) this.render(notification);
        });
  }

  ngOnDestroy() {
      this._subscribed = false;
  }

  private render(notification: INotify) {
    let notificationBox = this.renderer.createElement('div');
    let header = this.renderer.createElement('b');
    let content = this.renderer.createElement('div');

    const boxColorClass = this.classMap.get(notification.type);
    let classesToAdd = [
      'message-box',
      'alert',
      'd-flex',
      'align-items-center',
      boxColorClass
    ];
    classesToAdd.forEach(x => x && this.renderer.addClass(notificationBox, x));

    this.renderer.setStyle(notificationBox, 'transition', `opacity ${notification.duration}ms`);
    this.renderer.setStyle(notificationBox, 'opacity', '1');

    const headerText = this.renderer.createText(`${NotificationType[notification.type]}: `);
    this.renderer.appendChild(header, headerText);

    this.renderer.appendChild(notificationBox, header);

    const text = this.renderer.createText(` ${notification.message}`);
    this.renderer.appendChild(content, text);

    this.renderer.appendChild(this.container.nativeElement, notificationBox);
    this.renderer.appendChild(notificationBox, content);

    setTimeout(() => {
      this.renderer.setStyle(notificationBox, 'opacity', '0');
      setTimeout(() => {
          this.renderer.removeChild(this.container.nativeElement, notificationBox);
      }, notification.duration);
    }, notification.duration);
  }
  
}
