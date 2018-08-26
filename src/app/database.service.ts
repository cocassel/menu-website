import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class databaseService {
    
    host: string = "menu-flask-app.herokuapp.com";

    constructor(private _http: Http) {}

    wakeUpHerokuApi(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
         return this._http.get('https://' + this.host + '/wakeup', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }
    
    getDishes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
        return this._http.get('https://' + this.host + '/dishes', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
     }

    getDishTypes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
        return this._http.get('https://' + this.host + '/types', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }
    
    getFlags(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
         return this._http.get('https://' + this.host + '/flags', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }

    getFlaggedDishes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
        return this._http.get('https://' + this.host + '/flaggedDishes', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }

    getUsers(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
        return this._http.get('https://' + this.host + '/users', options)
            .map((response: Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }
    
    authenticateUser(username: string, password: string){

        let userToAuthenticate = { "username" : username, "password" : password };
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post('https://' + this.host + '/authenticateUser', userToAuthenticate, options)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteUser(userNumber: string){

		  const userToDelete= JSON.stringify({ "deleteUser": userNumber });
		  
		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers });
		  
		  return this._http.post('https://' + this.host + '/deleteUser', userToDelete, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    addUser(firstName: string, lastName: string, username:string, password: string, superuser: string){
		
		let userToAdd={"first_name": firstName, "last_name": lastName, "username": username , "password": password, "can_edit_users": superuser };

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		
		return this._http.post('https://' + this.host + '/addUser', userToAdd, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		 
    }

    deleteDish(dishNumber: string){

        const dishToDelete= JSON.stringify({ "deleteDish": dishNumber });
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post('https://' + this.host + '/deleteDish', dishToDelete, options)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addFlag(flagName: string){
		
		let flagToAdd={"flag_name": flagName};

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		
		return this._http.post('https://' + this.host + '/addFlag', flagToAdd, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		 
    }

    deleteFlag(flagNumber: string){

        const flagToDelete= JSON.stringify({ "deleteFlag": flagNumber });
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post('https://' + this.host + '/deleteFlag', flagToDelete, options)
              .map((res: Response) => res.json())
              .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateFlag(flagNumber: string, newFlagName: string){
		
        const flagToUpdate= JSON.stringify({ 'flag_id': flagNumber, 'flag_name': newFlagName });
        console.log(flagToUpdate);

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		
		return this._http.post('https://' + this.host + '/updateFlag', flagToUpdate, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		 
    }
}
