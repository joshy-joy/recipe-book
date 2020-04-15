import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';

import { recipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  recipeChangeLister: Subscription;

  constructor(private recipeService: recipeService) { }

  ngOnInit(){
    this.recipes = this.recipeService.getRecipe();
    this.recipeChangeLister = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy(){
    this.recipeChangeLister.unsubscribe();
  }

}
