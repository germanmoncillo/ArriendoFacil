import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { config } from '../../../../environments/configuration/config';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../../core/enum/router.app';
import { ModalComponent } from '../../../components/modal/modal.component';


@Component({
  selector: 'app-verusuarios',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './verusuarios.component.html',
  styleUrl: './verusuarios.component.css'
})

export class VerusuariosComponent implements OnInit, OnDestroy {


  recibirData($event: Event) {
throw new Error('Method not implemented.');
}
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

  eliminarUsuario(id: string) {
    if (id === this.usuarioLogin._id) {
      Swal.fire('Error!', 'No puede eliminar este usuario', 'error');
    } else {
      this.usuarioService.eliminarUnUsuario(id).subscribe((resp: any) => {
        this.cargarUsuarios();
        Swal.fire(
          'Eliminado',
          `Se eliminé el usuario ${resp.usuario.nombre}`,
          'success'
        );
      });
    }
  }

  actualizarRol(usuario: UsuarioModel) {
    this.usuarioService.actualizarUnUsuario(usuario).subscribe((resp: any) => {
      Swal.fire(
        'Actualizado',
        `Se actualizó el usuario ${resp.usuario.nombre}`,
        'success'
      );
    });
  }

  agregarUsuario() {
    this.router.navigateByUrl(ROUTER_APP.AGREGARUSUARIO);
  }
 
    // AGREGANDO MODAL
  
    modalAbrir:boolean= false;
  funcionAbrir(){
    this.modalAbrir=true;
  }
  funcionCerrar(){
    this.modalAbrir=false;
  }
  
  cerrarboton(evento:boolean){
    this.modalAbrir=false;
  }
}