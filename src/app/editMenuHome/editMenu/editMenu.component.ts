import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-menu',
  templateUrl: './editMenu.component.html',
  styleUrls: ['./editMenu.component.css']
})
export class editMenuComponent {
  title = 'editMenu';

  constructor(private router: Router) { }

  onBack(){
		this.router.navigateByUrl('/#');
	}
}
