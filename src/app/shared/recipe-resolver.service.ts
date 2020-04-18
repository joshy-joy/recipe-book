import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from '../recipes/recipe.model';

import { recipeService } from '../recipes/recipe.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private reciepService: recipeService){}

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot){
        this.reciepService.fetchDataFromFirebase();
    }
}