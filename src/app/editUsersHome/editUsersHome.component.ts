import { Component } from '@angular/core';

@Component({
  selector: 'edit-users-home',
  templateUrl: './editUsersHome.component.html',
  styleUrls: ['./editUsersHome.component.css']
})
export class editUsersHomeComponent {
  loggedIn: boolean=false;
  loggedInEmployee: number=0;
  
  onLoggedInChange(eventToEmit: any): void {
          this.loggedIn=eventToEmit[0];
          this.loggedInEmployee=eventToEmit[1];
          
      }
  }
  