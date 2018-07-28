import { Component } from '@angular/core';
import { databaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [databaseService]
})
export class AppComponent {
  title = 'app';
}
