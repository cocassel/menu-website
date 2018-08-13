import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-menu',
  templateUrl: './editMenu.component.html',
  styleUrls: ['./editMenu.component.css']
})
export class editMenuComponent {
  title = 'editMenu';
  editOption: string = 'unselected';

  constructor(private router: Router) { }

  onSelection(selection){
		this.editOption = selection;
  }
  
  onBack(){
    this.editOption='unselected';
	}
}
