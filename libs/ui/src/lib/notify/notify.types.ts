export enum NotificationType {
  Success = 0,
  Warning = 1,
  Error = 2,
}


export interface INotify {
  message: string;
  type: NotificationType;
  duration: number;
}
