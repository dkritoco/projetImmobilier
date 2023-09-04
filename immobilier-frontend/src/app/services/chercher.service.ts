import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivingPlace } from '../models/livingPlace'
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ChercherService {
  constructor(private http: HttpClient) {}

  getChercher(): Observable<LivingPlace[]> {
    return this.http.get<LivingPlace[]>(`${baserUrl}/chercherLivingPlace`);
  }

  getChercherParameter(typePhoto: string): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/chercherLivingPlace/${typePhoto}`);
  }

  getChercherParameterVille(city: string): Observable<any[]> {
    console.log('estoy aca en parametro' + baserUrl);
    return this.http.get<any[]>(`${baserUrl}/chercherLivingPlace/${city}`);
  }

  getChercherParameterAll(city: string, typePhoto: string): Observable<any[]> {
    console.log('estoy aca en parametro' + baserUrl);
    return this.http.get<any[]>(`${baserUrl}/chercherLivingPlace/${city}/${typePhoto}`);
  }
}
