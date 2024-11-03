import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Vehiculo } from './Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private readonly apiUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }
  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }
}
