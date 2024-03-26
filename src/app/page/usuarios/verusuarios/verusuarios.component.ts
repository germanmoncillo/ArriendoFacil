import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { config } from '../../../../environments/configuration/config';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verusuarios',
  standalone: true,
  imports: [],
  templateUrl: './verusuarios.component.html',
  styleUrl: './verusuarios.component.css'
})

export class VerusuariosComponent implements OnInit, OnDestroy {
  usuarioSubscription: Subscription
  usuarios: UsuarioModel[] = [];
  usuarioLogin: UsuarioModel;
  roles = config.roles; 
  
  constructor (  
    private usuarioService: UsuariosService,
    private autenticacionService: AutenticacionService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario;
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this.usuarioSubscription?.unsubscribe();
  
  }
  
  cargarUsuarios() {
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
    });
  }

}

