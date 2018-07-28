import { Component, Output, EventEmitter } from '@angular/core';
import { databaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({


    templateUrl: './menuLogin.component.html',
    styleUrls: ['./menuLogin.component.css'],
    selector: 'menu-login',
})
export class menuLoginComponent {
	
	loginCorrect=false;
	loginFailed=false;
	users: any[]=[];


	@Output()
    loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();	


    constructor(private _databaseService: databaseService, private router: Router) { 

	this._databaseService.getUsers()
            .subscribe(res  =>  {this.users = res} );
    }

 	onLogin(username: string, password: string){
 		for (let key of this.users){
			
			if(key.username==username){
				if(key.password==password){
					this.loginCorrect=true;
				}
			}
 		}
 		if (this.loginCorrect==false){
			this.loginFailed=true;
 		}
 		this.loggedIn.emit(this.loginCorrect);
	 }
	 

	onBack(){
		this.router.navigateByUrl('#');
	}

}
