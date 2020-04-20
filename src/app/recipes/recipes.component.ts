import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './recipe.model';

import { recipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeItem: Recipe;
  
  constructor(private recipeService: recipeService) { }

  ngOnInit(){
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeItem = recipe;
      });

    this.recipeService.fetchDataFromFirebase().subscribe();
  }

}
