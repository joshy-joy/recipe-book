import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class recipeService {

    recipeSelected = new EventEmitter<Recipe>();
    recipeChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe(
            'Mexican beacon stake', 
            'Salty fied bacon meat stake', 
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('cups red wine', 10), 
                new Ingredient('Beacon',110), 
                new Ingredient('Lime', 25)]
            ),
        new Recipe(
            'Beef stew', 
            '50% Less Sodium Beef Broth', 
            'https://cdn.pixabay.com/photo/2017/10/20/17/45/goulash-2872112_960_720.jpg',
            [
                new Ingredient('cups red wine', 10), 
                new Ingredient('Beef',110), 
                new Ingredient('Lime', 25)]
            ),
        ]

    constructor(private sLService: ShoppingListService){}

    
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
}