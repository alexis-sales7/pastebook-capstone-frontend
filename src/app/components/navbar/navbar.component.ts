import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { NotificationModel } from 'src/app/models/notificationModel';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { TriggerNotificationsService } from 'src/app/services/trigger-notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = localStorage.getItem('name');
  token: boolean = localStorage.getItem('token') !== null;

  // Code for searching users
  searchTerm: string = "";
  searchTerm2: string = "mikuuu";
  // Code for searching users

  // March 14 2 pm add-ons
  ownerUrl:string = localStorage.getItem('profileUrl');
  user_id:string = localStorage.getItem('user_id');
  // March 14 2 pm add-ons
  id: string;
  ws: WebSocketSubject<any>;
              
               
  notifications: NotificationModel[] = [];
  notification: NotificationModel;
  constructor(private sessionService: SessionService, 
              private router: Router,
              private notificationService: NotificationService,
              private triggerNotifications: TriggerNotificationsService) {
                this.connect();
                this.id = localStorage.getItem("user_id");
                this.imOnline(this.id);
              }
              
  ngOnInit(): void {
      this.triggerNotifications.connect();
      this.sessionService.hasToken.subscribe((token) => {
      this.token = token;
      this.name = this.sessionService.getName();

    });
    //console.log("reloaded navbar test")
    this.getNotifications();
    console.log(this.user_id);
    //this.triggerNotifications.imOnline(this.user_id);
    //console.log(this.notificationService.getNotificationShort(this.notification));
     // console.log(this.notifications)
  }

  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    
    this.ws = webSocket('ws://localhost:8080/onlineconnection'); // returns a WebSocketSubject
    
    this.ws.subscribe(
      // Called whenever there is a message from the server.
      msg => console.log(msg),
      // Called if at any point WebSocket API signals some kind of error.
      err => console.log(err),  
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    )

    // this.setConnected(true);
  }
  imOnline(id:string):void{
    this.ws.next({user_id:this.id});
  }

  getNotifications(){
    this.notificationService.getNotificationShort().subscribe((response: any) => {
      console.log("responding")
      console.log(response);
      this.notifications = response;
    })
  }
 
  logout() {
    this.sessionService.clear();
    this.ngOnInit();
    this.router.navigate(['/login']);
  }

  // routing to search component
  routeToSearchComponent() {
    this.router.navigate(['/search']);
  }

}
