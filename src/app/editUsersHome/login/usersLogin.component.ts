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
	authentication: any[] = [];
	loggedInUser: number = 0;
	eventToEmit: any[] = [];

	@Output()
    loggedIn: EventEmitter<any> = new EventEmitter<any>();	
    

	constructor(private _databaseService: databaseService, private router: Router) { }

 	onLogin(username: string, password: string){

		this.eventToEmit = [];

		this._databaseService.authenticateUser(username, password)
				.subscribe(res  =>  {this.authentication = res;
				
					if(this.authentication["user"]=="authenticated" && this.authentication["id"]!="invalid"){
						this.loginCorrect=true;
						this.loggedInUser=this.authentication["id"];
					}
					else {
						this.loginFailed=true;
					}
					this.eventToEmit[0]=this.loginCorrect;
					this.eventToEmit[1]=this.loggedInUser;
					this.loggedIn.emit(this.eventToEmit);
				} );
	}
	 
	onBack(){
		this.router.navigateByUrl('#');
	}

}
