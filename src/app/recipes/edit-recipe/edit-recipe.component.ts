import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recipeService } from '../recipe.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id: number;
  url: string;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: recipeService, private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let ingredients= new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getOneRecipe(this.id);
      recipeName = recipe['name'];
      recipeImagePath = recipe['imagePath'];
      recipeDescription = recipe['description'];
      if(recipe['ingredients']){
        for(let ingredient of recipe['ingredients']){
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      path: new FormControl(recipeImagePath, Validators.required),
      desc: new FormControl(recipeDescription, Validators.required),
      ingredients: ingredients
    });
  }

  onSubmit(){
    if(this.editMode){
      console.log(this.recipeForm.value)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      console.log(this.recipeForm.value)
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(Validators.required),
        amount: new FormControl([Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onClear(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
