import { Component, OnInit, OnDestroy} from '@angular/core';
import { recipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userObservable = new Subscription;

  constructor(
                private recipeService: recipeService, 
                private authService: AuthService,
                private router: Router
                ) { }

  ngOnInit(){
    this.userObservable = this.authService.user.subscribe(
      userData => {
        this.isAuthenticated = !!userData;
      }
    );
  }

  saveDataOnFirebase(){
    this.recipeService.saveDataInFirebase();
  }

  fetchDataOnFirebase(){
    this.recipeService.fetchDataFromFirebase().subscribe();
  }

  onLogin(){
    if(!this.isAuthenticated){
      this.router.navigate(['/auth']);
    } else {
      this.authService.logout();
      this.router.navigate(['/auth']);
    }
  }

  ngOnDestroy(){
    this.userObservable.unsubscribe();
  }
}
