import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginInterface } from '../../core/interfaces/login-interface';
import { environment } from '../../../environments/environment';

const base_url= environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuario: UsuarioModel;
  constructor(private httpClient: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  validateToken(): Observable <boolean>{
    return this.httpClient.get(`${base_url}/auth`,{
      headers:{
        'x-token':this.token,
      },
    })
    .pipe(
      map((resp: any ) =>{
        const{
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          password,
          rol,
          estaod,
          createdAt,
        } = resp.usuario;

        this.usuario = new UsuarioModel (
          _id,
          nombre,
          email,
          tipoDocumento,
          numeroDocumento,
          login,
          password,
          rol,
          estaod,
          createdAt,
        );
        localStorage.setItem('token', resp.token);
        console.log("qui",resp)
        return true;
      }),
      catchError((error)=>{
        console.error(error);
        return of(false);
      })
      );
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${base_url}/auth`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}

