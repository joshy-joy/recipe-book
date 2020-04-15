import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model'

import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) formEdit: NgForm;

  editMode= false;
  ingredientEditIndex: number;
  ingredientEditListner: Subscription;
  ingredientEditData: Ingredient

  constructor(private sLService: ShoppingListService) { }

  ngOnInit(){
    this.ingredientEditListner = this.sLService.ingredientEdit.subscribe(
      (index: number) => {
        this.editMode=true;
        this.ingredientEditIndex = index;
        this.ingredientEditData = this.sLService.getIngredient(this.ingredientEditIndex);
        this.formEdit.setValue({
          name: this.ingredientEditData.name,
          amount: this.ingredientEditData.amount
        });
      }
    );
  }

  ngOnDestroy(){
    this.ingredientEditListner.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const name = value['name'];
    const amount = value['amount'];
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.sLService.updateIngredients(this.ingredientEditIndex, newIngredient);
    }
    else {
      this.sLService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.formEdit.reset();
  }

  onClear(){
    this.editMode = false;
    this.formEdit.reset();
  }

  onDelete(){
    this.sLService.deleteIngredient(this.ingredientEditIndex);
    this.editMode = false;
    this.formEdit.reset();
  }

}
