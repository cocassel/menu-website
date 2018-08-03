import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class databaseService {
    
    host: string = "menu-flask-app.herokuapp.com";

    constructor(private _http: Http) {}


    getUsers(){

       let headers = new Headers({'Content-Type': 'application/json'});
       let options = new RequestOptions({ headers: headers});


        return this._http.get('https://' + this.host + ':5000/users', options)
            .map((response: Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
    }

    
    getDishes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
 
         return this._http.get('https://' + this.host + ':5000/dishes', options)
             .map((response: Response) => response.json())
         .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
     }

       
    getDishTypes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
 
         return this._http.get('https://' + this.host + ':5000/types', options)
             .map((response: Response) => response.json())
         .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
     }
    
     getFlags(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
 
         return this._http.get('https://' + this.host + ':5000/flags', options)
             .map((response: Response) => response.json())
         .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
     }

     getFlaggedDishes(){

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
 
 
         return this._http.get('http://' + this.host + ':5000/flaggedDishes', options)
             .map((response: Response) => response.json())
         .catch((error:any) => Observable.throw(error.json().error || 'Server error' ));
     }

    deleteUser(employeeNumber: string){

		  const userToDelete= JSON.stringify({ "deleteUser": employeeNumber });
		  
		  let headers = new Headers({ 'Content-Type': 'application/json' });
		  let options = new RequestOptions({ headers: headers });
		  
		  return this._http.post('https://' + this.host + ':5000/deleteUser', userToDelete, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
			
    }
    
    addUser(firstName: string, lastName: string, username:string, password: string, superuser: string){
		
		let userToAdd={"first_name": firstName, "last_name": lastName, "username": username , "password": password, "can_edit_users": superuser };

		
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers }); 
		
		return this._http.post('https://' + this.host + ':5000/addUser', userToAdd, options)
				.map((res: Response) => res.json())
				.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		 
    }


}
