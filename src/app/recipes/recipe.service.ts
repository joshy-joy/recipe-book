import { EventEmitter, Injectable, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { tap, take, exhaustMap } from 'rxjs/operators'; 
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class recipeService implements OnInit{

    recipeSelected = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = []

    constructor(
                private sLService: ShoppingListService, 
                private http: HttpClient,
                private authService: AuthService
                ){}

    ngOnInit(){
    }

    
    getRecipe(){
        return this.recipes.slice();
    }

    getOneRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.sLService.addRecipeIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number){
        this.recipes.splice(id,1);
        this.recipeChanged.next(this.recipes.slice());
    }

    fetchDataFromFirebase(){
        return this.http.get<Recipe[]>('https://ng-course-project-636ea.firebaseio.com/recipes.json')
        .pipe(tap(
            recipe => {
                this.recipes = recipe;
                }
            )
        );
    }


    saveDataInFirebase(){
        this.http.put('https://ng-course-project-636ea.firebaseio.com/recipes.json', this.recipes).subscribe(
            response => {
                console.log(response);
            }
        )
    }
}