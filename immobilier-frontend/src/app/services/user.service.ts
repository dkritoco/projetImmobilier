import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import baserUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //utilisamos una variable del tipo httpclient que es quien me permite comunicarme con el DAO
  constructor(private httpClient: HttpClient) {}

  public enregistrerUtilisateur(user: any) {
    //PARA HACER UN POST DEBEMOS ENVIAR LO QUE VAMOS A GUARDAR
    return this.httpClient.post(`${baserUrl}/insert`, user);
  }


}

