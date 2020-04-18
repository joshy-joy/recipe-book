import { Component, OnInit} from '@angular/core';
import { recipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: recipeService) { }

  ngOnInit(){
  }

  saveDataOnFirebase(){
    this.recipeService.saveDataInFirebase();
  }

  fetchDataOnFirebase(){
    this.recipeService.fetchDataFromFirebase();
  }
}
