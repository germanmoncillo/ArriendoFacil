import { Component, EventEmitter, OnInit, Output, afterNextRender } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { UsuarioInterface } from '../../../core/interfaces/usuario';
import { AgregarclientesComponent } from '../../clientes/agregarclientes/agregarclientes.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { config } from '../../../../environments/configuration/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agrearusuarios',
  standalone: true,
  imports: [ReactiveFormsModule, AgregarclientesComponent, ModalComponent],
  templateUrl: './agrearusuarios.component.html',
  styleUrl: './agrearusuarios.component.css'
})

export class AgrearusuariosComponent implements OnInit {

    // usuarioForm = new FormGroup({
    //   nombre: new FormControl("",Validators.required),  
    //   email: new  FormControl('',[Validators.email,Validators.required]),
    //   tipoDocumento: new  FormControl('',[Validators.required]),                    
    //   numerodeDocumento: new FormControl('',[Validators.required]),
    //   login: new FormControl('',[Validators.required]),
    //   password: new FormControl('',[Validators.required]),
    // });

    usuarioForm: FormGroup;
    roles = config.roles;
  
      //emite eventos hacia afuera del componente de agregar clientes y envia un objeto tipo cliente cliente son las 
//las varibaels cliente 
  
    @Output () mostrarUsuario: EventEmitter<UsuarioInterface> = new EventEmitter<UsuarioInterface>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
    @Output () cerrarform:EventEmitter<boolean> = new EventEmitter<boolean>;
  
  // constructor creacion
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService
    ){}

    ngOnInit(): void {
      this.usuarioForm = this.formBuilder.group({
        nombre: [''],
        email: [''],
        tipoDocumento: [''],
        numeroDocumento: [''],
        password: [''],
      });
    }

    // ['', Validators.required],
  
    crearUsuario() {
       if (this.usuarioForm.valid) {
        const usuarioData = this.usuarioForm.value;
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
            Swal.fire('Error', `Error al crear el usuario, ${error}`, 'error');
          },
        });
      } else {
        Swal.fire(
          'Error',
          `El formulario es inválido. Por favor, revise los campos`,
          'error'
        );
      }
    }
  
  // crearusuario (){
  //  const UsuarioNuevo = this.usuarioForm.value;

  //     if(this.usuarioForm.valid) { 
        
  //       const data: UsuarioModel = {
  //         nombre: UsuarioNuevo.nombre || '',
  //         email: UsuarioNuevo.email || '',
  //         tipoDocumento: UsuarioNuevo.tipoDocumento || '',
  //         /*   formulario tiene un grupo de controles  cada input es un control*/
  //         numeroDocumento: UsuarioNuevo.numerodeDocumento || '',
  //         login: UsuarioNuevo.login || '',
  //         password: UsuarioNuevo.password || '',
  //         _id: '',
  //         rol: '',
  //         estado: false,
  //         // creo objeto date
  //         createdAt: new Date()
  //       };

  //     // le decimos al suscrubisrse que me de como tal la respuesta 
  //       this.usuarioService.crearUsuario(data).subscribe({
  //         next:(resp: any) => {
  //         console.log('Usuario creado', resp);
  //         },
  //         error: (error:any) => {
  //         console.log('Error al crear el usuario', error);
  //         },
  //       });
  //       console.log('datos', this.usuarioForm.value)
  //     }
  //   }
    
  cerrarF() {
    this.cerrarform.emit(false);
  }
}
