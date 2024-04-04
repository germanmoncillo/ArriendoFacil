import { Component, EventEmitter, Input, OnInit, Output, afterNextRender } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioInterface } from '../../../core/interfaces/usuario';
import { AgregarclientesComponent } from '../../clientes/agregarclientes/agregarclientes.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { config } from '../../../../environments/configuration/config';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { VerusuariosComponent } from '../verusuarios/verusuarios.component';

@Component({
  selector: 'app-agrearusuarios',
  standalone: true,
  imports: [ReactiveFormsModule, AgregarclientesComponent, ModalComponent],
  templateUrl: './agrearusuarios.component.html',
  styleUrl: './agrearusuarios.component.css'
})

export class AgrearusuariosComponent implements OnInit {

    usuarioForm: FormGroup;
    roles = config.roles;
    editando: boolean = false; 
  
      //emite eventos hacia afuera del componente de agregar clientes y envia un objeto tipo cliente cliente son las 
    //las varibaels cliente 
  
    @Output () mostrarUsuario: EventEmitter<UsuarioInterface> = new EventEmitter<UsuarioInterface>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
    @Output () cerrarform: EventEmitter<boolean> = new EventEmitter<boolean>;
  
  // constructor creacion
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private verusuariosComponent: VerusuariosComponent
  ){}

    ngOnInit(): void {
      this.usuarioForm = this.formBuilder.group({
        _id: [''],
        nombre: [''],
        email: [''],
        tipoDocumento: [''],
        numeroDocumento: [''],
        password: [''],
        login:['']
      });

      this.verusuariosComponent.editarUsuarioEvent.subscribe((usuario: UsuarioModel) => {
        this.editarUsuarioSeleccionado(usuario);
      });
    }
  
    crearUsuario() {
       if (this.usuarioForm.valid) {
        const usuarioData = this.usuarioForm.value;
        if(this.editando){
          delete usuarioData.password;
          this.usuarioService.actualizarUnUsuario(usuarioData).subscribe({
            next: (resp: any) => {
              Swal.fire(
                'editado',
                `Se actualizó el usuario ${resp.usuario.nombre} satisfactoriamente`,
                'success'
              );
              this.usuarioForm.reset();
            },
            error: (error) => {
              Swal.fire('Error', `Error al editar el usuario, ${error.error.msg}`, 'error');
            },
          });
        } else{
          delete usuarioData._id;
          this.usuarioService.crearUsuario(usuarioData).subscribe({
            next: (resp: any) => {
              Swal.fire(
                'Creado',
                `Se creó el usuario ${resp.usuario.nombre} satisfactoriamente`,
                'success'
              );
              this.usuarioForm.reset();
            },
            error: (error) => {
              Swal.fire('Error', `Error al crear el usuario, ${error.error.msg}`, 'error');
            },
          });
        }        
      } else {
        Swal.fire(
          'Error',
          `El formulario es inválido. Por favor, revise los campos`,
          'error'
        );
      }
    }
  
  editarUsuarioSeleccionado(usuario: UsuarioModel) {
    this.usuarioForm.patchValue(usuario);
    this.editando = true; 
  }

  resetForm() {
    this.usuarioForm.reset(); // Restablecer el formulario
    this.editando= false;
  }
    
  cerrarF() {
    this.cerrarform.emit(false);//revisar si esto hace algo!!!!
  }

}
