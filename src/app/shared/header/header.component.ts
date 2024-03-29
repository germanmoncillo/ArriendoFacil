import { Component, Inject, NgModule, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'
import { ROUTER_APP } from '../../core/enum/router.app';

import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,PermisosDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
 get ROUTER_APP(){
  return ROUTER_APP;

 }
//inyectando sin contructor el cerrar sesion
autenticacionservice = inject(AutenticacionService)
  
login(){
    type LoginFormResult = {
      username: string
      password: string
    }
    
    let usernameInput: HTMLInputElement
    let passwordInput: HTMLInputElement
    
    Swal.fire<LoginFormResult>({
      title: 'Login Form',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      confirmButtonText: 'Sign in',
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!
        usernameInput = popup.querySelector('#username') as HTMLInputElement
        passwordInput = popup.querySelector('#password') as HTMLInputElement
        usernameInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
        passwordInput.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const username = usernameInput.value
        const password = passwordInput.value
        if (!username || !password) {
          Swal.showValidationMessage(`Por favor ingrese el Email y contraseña`)
          console.log(!username || !password)
        }
        return { username, password }
      },
    })
  }

  cerrarSesion(){
this.autenticacionservice.logout();
  }

}
