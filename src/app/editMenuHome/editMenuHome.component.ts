import { Component } from '@angular/core';

@Component({
  selector: 'edit-menu-home',
  templateUrl: './editMenuHome.component.html',
  styleUrls: ['./editMenuHome.component.css']
})
export class editMenuHomeComponent {
  title = 'editMenuHomeComponent';

  loggedIn: boolean = false;


onLoggedInChange(loggedIn: boolean): void {
        this.loggedIn = loggedIn;
    }
}
