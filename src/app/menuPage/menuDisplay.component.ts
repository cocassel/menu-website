import { Component, Output, EventEmitter } from '@angular/core';
import { databaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({

    templateUrl: './menuDisplay.component.html',
    styleUrls: ['./menuDisplay.component.css'],
    selector: 'menu-display',
})
export class menuDisplayComponent {
	
	displayDetails: boolean = false;
	dishes: any[] = [];
    types: any[] = [];
    flags: any[] = [];
    flaggedDishes: any[] = [];
    temp: boolean = true;
    satisfied: any[] = [];
    foundIt: boolean = false;

    constructor(private _databaseService: databaseService, private router: Router) { 

        this._databaseService.getDishes()
                .subscribe(res  =>  {this.dishes = res} );
        this._databaseService.getDishTypes()
                .subscribe(res  =>  {this.types = res} );
        this._databaseService.getFlaggedDishes()
                .subscribe(res  =>  {this.flaggedDishes = res,
                    this._databaseService.getFlags()
                    .subscribe(res  =>  {this.flags = res});
                });
    }
    
	onBack(){
		this.router.navigateByUrl('#');
    }

    boxChecked(){

        this.satisfied = [];
        this.temp = true;
        this.foundIt = false;

        for (let dish of this.dishes){
            this.temp = true;
            for(let flag of this.flags){
                this.foundIt = false;
                if(flag.selected == false){ //automatically satisfied if the dietary restrictions isn't checked
                    this.satisfied.push({
                        flag_id: flag.flag_id,
                        satisfies_flag: true
                    })
                }
                if(flag.selected == true){
                    for(let flaggedDish of this.flaggedDishes){
                        if(flaggedDish.dish_id == dish.dish_id && flag.flag_id == flaggedDish.flag_id){
                            this.foundIt = true;
                            this.satisfied.push({
                                flag_id: flag.flag_id,
                                satisfies_flag: true
                            })
                        }  
                    }
                    if(this.foundIt == false){ //if we didn't find it
                        this.satisfied.push({
                            flag_id: flag.flag_id,
                            satisfies_flag: false
                        })
                    }
                    else{
                        this.foundIt = false;
                    }
                }
            }
            for(let dietaryRestriction of this.satisfied){
                if(dietaryRestriction.satisfies_flag == false){
                    this.temp = false;
                }
            }
            if(this.temp == false){
                dish.visible = "false";
            }
            else{
                dish.visible = "true";
            }
           
            //set dish to visible if it satisfied all selected flags
            //reset satified dict and temp boolean
            this.satisfied = [];
            this.temp = true; 
        }
    }
}