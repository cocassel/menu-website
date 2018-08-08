import { Component } from '@angular/core';
import { databaseService } from './database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [databaseService]
})
export class AppComponent {
  title = 'app';

  constructor(private _databaseService: databaseService, private router: Router) { 
    this._databaseService.wakeUpHerokuApi()
      .subscribe(res  =>  {} ); 
  }

}
