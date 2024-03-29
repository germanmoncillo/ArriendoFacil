import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { 
  Observable, 
  Subject, 
  catchError, 
  map, 
  of, 
  tap } from 'rxjs';
import { LoginInterface } from '../../core/interfaces/login-interface';
import { environment } from '../../../environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private loginEvent=new Subject<void> ();
  // Evento de deslogeuarme
  private logoutEvent=new Subject<void> ();

  usuario: UsuarioModel;
  constructor(private httpClient: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  // el get es que me permite suscribirme al evento 
  get onLogin () : Subject<void> {
    return this.loginEvent;
  }
  get onLogout () : Subject<void> {
    return this.logoutEvent;
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
          estado,
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
          estado,
          createdAt,
        );
        this.usuario.password = '';
        this.usuario.numeroDocumento = '';
        this.usuario.email = '';
        localStorage.setItem('token', resp.token);
        // en el localstorage no puedo almacenar objetos por eso no es res.usuario
        localStorage.setItem('usuario',JSON.stringify(this.usuario));
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
        //nos ayuda hacer la atutenticacion
        this.validateToken().subscribe(() => {
          this.loginEvent.next();
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
    localStorage.removeItem('usuario');
    // lo que tenga que ocurrir lo que tenga que hacer en next
    this.logoutEvent.next();
  }
}

