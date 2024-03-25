import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CLienteModel } from '../../core/models/cliente.model';

const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  getclientes() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient:HttpClient) { }

  // get token(): string {
  //   return localStorage.getItem('token') || '';
  // }


  // get headers () {
  //   return {
  //     headers : {
  //       "x-token": this.token,
  //     },
  //   }
  // };

  //entonces cuando coloco this.headers es que me viene con el token para 
  //creacion de cliente


  getClientes(){
    return this.httpClient.get(`${base_url}/cliente` );
  }
// como la voy a recibir del formulario recibo toda la data del cliente 
  crearClientes(cliente: CLienteModel)
{
  return this.httpClient.post(`${base_url}/cliente`, cliente);

}

}
