import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, ResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLogin = false;
  isLoading = false;

  error: string;

  authListner: Observable<ResponseData>;

  constructor(private authServie: AuthService, private router: Router) { }

  ngOnInit(){
  }

  switchToLogin(){
    if(this.isLogin)
      this.isLogin = false;
    else
      this.isLogin = true;
  }

  onSubmit(form: NgForm){
    if(!form.valid)
      return;
    
    const email = form.value['email'];
    const password = form.value['password'];
    this.isLoading = true;

    if(this.isLogin){
      this.authListner = this.authServie.login(email, password);
    } else {
      this.authListner = this.authServie.signUp(email, password);
    }

    this.authListner.subscribe(
      response => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error => {
        this.error = error
        this.isLoading = false;
      }
    );
    
    form.reset();
  }

}
