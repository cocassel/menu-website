import { Component, Output, EventEmitter } from '@angular/core';
import { databaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './menuLogin.component.html',
    styleUrls: ['./menuLogin.component.css'],
    selector: 'menu-login',
})
export class menuLoginComponent {
	
	loginCorrect = false;
	loginFailed = false;
	authentication: any[]=[];

	@Output()
    loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();	

    constructor(private _databaseService: databaseService, private router: Router) { }

 	onLogin(username: string, password: string){

		this._databaseService.authenticateUser(username, password)
		.subscribe(res  =>  {this.authentication = res;
			if(this.authentication["user"] == "authenticated"){
				this.loginCorrect=true;
			}
			 else {
				this.loginFailed=true;
			 }
			 this.loggedIn.emit(this.loginCorrect);
		} );
	}

	onBack(){
		this.router.navigateByUrl('#');
	}
}
