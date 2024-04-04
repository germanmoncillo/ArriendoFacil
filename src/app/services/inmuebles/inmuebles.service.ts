import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InmuebleModel } from '../../core/models/inmueble.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class InmueblesService {

  constructor( private httpClient: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    };
  }

  crearInmueble(inmueble: InmuebleModel) {
    return this.httpClient.post(`${base_url}/inmueble`, inmueble, this.headers);
  }

  consultarInmueble() {
    return this.httpClient.get(`${base_url}/inmueble`, this.headers);
  }

  eliminarInmueble(id: string) {
    return this.httpClient.delete(`${base_url}/inmueble/${id}`, this.headers);
  }
  
  actualizarInmueble(inmueble: InmuebleModel) {
    return this.httpClient.put(`${base_url}/inmueble/${inmueble._id}`, inmueble, this.headers);
  }

}
