import { Controller, Get } from "@nestjs/common";

import { NotificationService } from "./notification.service";

@Controller("notifications")

export class NotificationsController{

constructor(

private service:NotificationService

){}

@Get()

findAll(){

return this.service.findAll();

}

}