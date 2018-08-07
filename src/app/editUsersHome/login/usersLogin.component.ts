import { Component, Output, EventEmitter } from '@angular/core';
import { databaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './usersLogin.component.html',
    styleUrls: ['./usersLogin.component.css'],
    selector: 'users-login',
})
export class usersLoginComponent {
	
	loginCorrect = false;
	loginFailed = false;
	users: any[] = [];
	loggedInUser: number = 0;
	eventToEmit: any[] = [];

	@Output()
    loggedIn: EventEmitter<any> = new EventEmitter<any>();	
    

    constructor(private _databaseService: databaseService, private router: Router) { 

	this._databaseService.getUsers()
            .subscribe(res  =>  {this.users = res} );
    }

 	onLogin(username: string, password: string){
		this.eventToEmit = [];
 		for (let key of this.users){
			
			if(key.username == username){
				if(key.password == password && key.can_edit_users == 'True'){
					this.loginCorrect = true;
					this.loggedInUser=key.user_id;
					
				}
			}
 		}
 		if (this.loginCorrect == false){
			this.loginFailed = true;
 		}
 		this.eventToEmit[0] = this.loginCorrect;
		this.eventToEmit[1] = this.loggedInUser;
 		this.loggedIn.emit(this.eventToEmit);
	 }
	 
	onBack(){
		this.router.navigateByUrl('#');
	}

}
