import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Subscription } from 'rxjs';
import { config } from '../../../../environments/configuration/config';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../../components/modal/modal.component';
import { AgrearusuariosComponent } from '../agrearusuarios/agrearusuarios.component';
import { UsuarioInterface } from '../../../core/interfaces/usuario';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-verusuarios',
  standalone: true,
  imports: [AgrearusuariosComponent,ModalComponent, FormsModule],
  templateUrl: './verusuarios.component.html',
  styleUrl: './verusuarios.component.css'
})

export class VerusuariosComponent implements OnInit, OnDestroy {
  
  @ViewChild(AgrearusuariosComponent) agregarUsuariosComponent: AgrearusuariosComponent; //aqui le decimos que queremos ver al hijo(agregarusuarios) y con este viewcild podemos usar la funcion que agregamos allá!

  usuarioSubscription: Subscription
  usuarios: UsuarioModel[] = [];
  usuarioLogin: UsuarioModel;
  roles = config.roles; 
  searchTerm: string = '';
  filteredData: any[] = [];

  @Output() editarUsuarioEvent: EventEmitter<UsuarioModel> = new EventEmitter<UsuarioModel> ();

// este va en el html
  usuarioEliminar: string = '';
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
  
  recibirData(nuevoUsuario: UsuarioInterface) {
    this.usuarios.push(nuevoUsuario);
    }

  cargarUsuarios() {
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.filteredData = this.usuarios;
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
        this.funcionCerrar2();
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
 
    // AGREGANDO MODAL
  
  modalAbrir:boolean= false;
  modalAbrir2:boolean= false;

    funcionAbrir(){
      this.modalAbrir=true;
    }
    funcionAbrir2(user:string){
      this.modalAbrir2=true;
      this.usuarioEliminar=user;
    }

    funcionCerrar(){
      this.modalAbrir=false;
      this.agregarUsuariosComponent.resetForm();
    }
    
    funcionCerrar2(){
      this.modalAbrir2=false;
    }
  
    cerrarboton(evento:boolean){
      this.modalAbrir=false;
    }
  
    // si es verdadera me mostrara la informacion filtrada 
    filterData(): void {
      //verifico lo que esta escrito si no hay nada 
      // en searchTerm trim quita espacio 
      if (!this.searchTerm.trim()) {
        this.filteredData = [...this.usuarios];
        return;
      }
  
      //Convertimos el termino a buscar en minusculas para luego hacer el filtro.
      // filter data hace filtro en un objeto 
      // busca la llave del objeto que es un key es el identificador de la tabla 
      // la fila hace referencia el key ojo
      // hace filtra llama y almacena el valor en el item (en el objeto)
      // si el valor es igual al string 
      // imte es especificador de toda la linea 
      const searchTermLower = this.searchTerm.trim().toLowerCase();
      this.filteredData = this.usuarios.filter((item: any) => {
        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            const value = item[key];
            if (
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTermLower)
            ) {
              return true;
            }
          }
        }
        return false;
      });
    }

    editarUsuario(usuario: UsuarioModel) {
      this.funcionAbrir();
      this.editarUsuarioEvent.emit(usuario);
    }

}