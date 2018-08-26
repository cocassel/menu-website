import { Component } from '@angular/core';
import { databaseService } from '../../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-menu',
  templateUrl: './editMenu.component.html',
  styleUrls: ['./editMenu.component.css']
})
export class editMenuComponent {
  title = 'editMenu';

  dishes: any[] = [];
  types: any[] = [];
  flags: any[] = [];
  flaggedDishes: any[] = [];
  temp: boolean = true;
  satisfied: any[] = [];
  foundIt: boolean = false;
  addFilterForm = false;
  flagsToEdit = {};
  flagsChecked: any[] = [];

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

  onEditFlagButtonClicked(flagNumber: string, flagName: string){
    this.flagsToEdit[flagNumber] = flagName;      
  }

  onEditFlagSubmitted(flagNumber: string){
      
        this._databaseService.updateFlag(flagNumber, this.flagsToEdit[flagNumber])
        .subscribe(res => {
            this._databaseService.getFlags()
                .subscribe( res => {this.flags = res,
                    delete this.flagsToEdit[flagNumber];
                })
        })  
        
    }

  editFlag(flagNumber: string){
      return (flagNumber in this.flagsToEdit);

  }
  onAddFilterButtonClicked(){
    this.addFilterForm = true;
  }
  onAddFilterButtonMinimized(){
    this.addFilterForm = false;
  }
  onAddFilterSubmit(flagName: string){
        this._databaseService.addFlag(flagName)
        .subscribe(res => { 
            this._databaseService.getFlags()
                .subscribe(res  =>  {this.flags = res} );}
        );       
  }

  onDeleteFlag(flagNumber: string){
        this._databaseService.deleteFlag(flagNumber)
            .subscribe(res => { 
                this._databaseService.getFlags()
                    .subscribe(res  =>  {this.flags = res,
                        this._databaseService.getFlaggedDishes()
                            .subscribe(res => {this.flaggedDishes = res,
                            this.boxChecked();
                            }) } );}
            );
    }
  onDeleteDish(dishNumber: string){
        this._databaseService.deleteDish(dishNumber)
                .subscribe(res => { 
                    this._databaseService.getDishes()
                        .subscribe(res  =>  {this.dishes = res} );}
                );
    }

  boxChecked(){
      
    this.satisfied = [];
    this.temp = true;
    this.foundIt = false;

    for (let dish of this.dishes){
        this.temp = true;
        for(let flag of this.flags){
            this.foundIt = false;
            if(flag.selected == false){ //dish flag pair automatically satisfied if the dietary restriction isn't checked
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
