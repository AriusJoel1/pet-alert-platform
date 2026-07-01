export interface NotificationObserver {
  update(message: string): Promise<void>;
}