﻿import { Component, Input } from '@angular/core';
import { databaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({

    templateUrl: './editUsers.component.html',
    styleUrls: ['./editUsers.component.css'],
    selector: 'edit-users',
})
export class editUsersComponent {

		users: any[] = [];
		showForm: boolean = false;
		allFieldsFilled: boolean = true;
		userAdded: boolean = false;
		userAddedName = "" ;
		
		constructor(private _databaseService: databaseService, private router: Router) { 

			this._databaseService.getUsers()
					.subscribe(res  =>  {this.users = res} );
					
		}
		
		@Input()
		loggedInUser = 0;
		
		
		onDelete(userNumber: string){
			this._databaseService.deleteUser(userNumber)
            .subscribe(res => { 
				this._databaseService.getUsers()
					.subscribe(res  =>  {this.users = res} );}
            );
		}
		
		onAddUser(firstname: string, lastname:string, username:string, password:string, selectedOption: string ){ 
			this.userAddedName = "";
			this.userAdded = false;
			if(firstname == "" || lastname == "" || username == "" || password == "")
				this.allFieldsFilled = false;
			else
				this.allFieldsFilled = true;
			if(this.allFieldsFilled == true)
				this._databaseService.addUser(firstname, lastname, username, password, selectedOption)
				.subscribe(res => { 
				this.userAdded = true;
				this.userAddedName = firstname + " " + lastname;
				this._databaseService.getUsers()
					.subscribe(res  =>  {this.users = res} );}
				);
		}
		
		onAddButton(){
			this.showForm = true;
		}
		
		onBack(){
			this.showForm = false;
			this.allFieldsFilled = true;
			this.userAdded = false;
			this.userAddedName = "";
		}
}
