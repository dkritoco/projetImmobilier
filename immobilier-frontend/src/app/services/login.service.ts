import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  showOptions: boolean = false;
  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //generamos un metodo en el servidor y generamos el token
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/login`, loginData, {
      responseType: 'text',
    });
  }
  //iniciar sesion y establecemos el token en el localStorage
  public loginUser(token: any) {
    console.log('establecemos el token: ' + token);
    if (token !== undefined && token !== null) {
         localStorage.setItem('token', token);
       this.showOptions = true;
    }
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }
  //cerrar sesion y eliminamos el token del localStorage

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // obtengo el token
  public getToken() {
    console.log('recuperamos el token');
    let variable = localStorage.getItem('token');
    console.log(variable);
    return localStorage.getItem('token');
  }

  //convierte un string a JSON
  public setUser(user: any) {
    console.log(localStorage.setItem('user', JSON.stringify(user)));
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
  if (user && user.role && user.role.nameRole) {
      return user.role.nameRole;
    }
    return null;
  }
 

  public getCurrentUser() {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.http.get(`${baserUrl}/profil`, { headers }).pipe(
      //return this.http.get(`${baserUrl}/profil`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('erreur lors de l obtention de l utilisateur actuel: ', error);
        return throwError('Impossible d obtenir l utilisateur');
      })
    );
  }
}
