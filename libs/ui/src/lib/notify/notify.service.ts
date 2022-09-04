import { Injectable } from '@angular/core';
import { NotificationType, INotify } from './notify.types';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  constructor() {}
  private notification$: Subject<INotify | null> = new BehaviorSubject<INotify | null>(null);

  private notify(message: string, type: NotificationType, duration?: number) {
      duration = !duration ? 3000 : duration;
      this.notification$.next({
          message: message,
          type: type,
          duration: duration
      } as INotify);
  }

  get notification() {
    return this.notification$.asObservable();
  }

  success(message: string, duration?: number) {
      this.notify(message, NotificationType.Success, duration);
  }

  warning(message: string, duration?: number) {
      this.notify(message, NotificationType.Warning, duration);
  }

  error(message: string, duration?: number) {
      this.notify(message, NotificationType.Error, duration);
  }

}
