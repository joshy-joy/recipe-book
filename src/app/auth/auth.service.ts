import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface ResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    signUp(email: string, password: string){
        return this.http.post<ResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyEwGcT04Hz2ai7MgeVQ1C7IZfYPw1k8A',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(catchError(this.errorHandler));
    }

    login(email: string, password: string) {
        return this.http.post<ResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyEwGcT04Hz2ai7MgeVQ1C7IZfYPw1k8A',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.errorHandler),tap(
            responseData => {
                this.authenticationHandler(
                    responseData.email,
                    responseData.idToken,
                    responseData.idToken,
                    responseData.expiresIn
                )
            }
        ));
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
    }

    autoLogin() {
        const userData: { email: string, 
            localId: string, 
            _token: string,
            _tokenExpirationTime: string} = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(
                                    userData.email, 
                                    userData.localId, 
                                    userData._token,
                                    new Date(userData._tokenExpirationTime) 
                                    ) 
        if(loadedUser.token){
            this.user.next(loadedUser);
        }
    }

    private errorHandler(errorResponse: HttpErrorResponse){
        let error = 'something went wrong!';
        if(!errorResponse.error || !errorResponse.error.error){
            return throwError(error);
        }
        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS': error = 'The email address is already exist';break;
            case 'EMAIL_NOT_FOUND': error = 'Email id not found';break;
            case 'INVALID_PASSWORD': error = 'The password is invalid';break;
        }
        return throwError(error);
    }

    private authenticationHandler(email, localId, token, expiresIn) {
        const tokenExpirationTime = new Date().getTime() + +expiresIn * 1000;
        const user = new User(email, localId, token, tokenExpirationTime);
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user);
    }
}