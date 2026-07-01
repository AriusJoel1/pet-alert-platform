import { NotificationObserver } from "./notification-observer.interface";

export class NotificationSubject{

  private observers:NotificationObserver[]=[];

  subscribe(observer:NotificationObserver){

    this.observers.push(observer);

  }

  async notify(message:string){

    for(const observer of this.observers){

      await observer.update(message);

    }

  }

}