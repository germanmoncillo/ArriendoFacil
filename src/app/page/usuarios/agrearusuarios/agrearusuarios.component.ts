import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { UsuarioInterface } from '../../../core/interfaces/usuario';

@Component({
  selector: 'app-agrearusuarios',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agrearusuarios.component.html',
  styleUrl: './agrearusuarios.component.css'
})
export class AgrearusuariosComponent {

    usuarioForm = new FormGroup({
      nombre: new FormControl("",Validators.required),  
      email: new  FormControl('',[Validators.email,Validators.required]),
      tipoDocumento: new  FormControl('',[Validators.required]),                    
      numerodeDocumento: new FormControl('',[Validators.required]),
      login: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  
      //emite eventos hacia afuera del componente de agregar clientes y envia un objeto tipo cliente cliente son las 
//las varibaels cliente 
  
    @Output () mostrarUsuario: EventEmitter<UsuarioInterface> = new EventEmitter<UsuarioInterface>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
    @Output () cerrarform:EventEmitter<boolean> = new EventEmitter<boolean>;
  
  // constructor creacion
  constructor(private usuarioService: UsuariosService){}
  
  
  crearusuario (){
   const UsuarioNuevo = this.usuarioForm.value;

      if(this.usuarioForm.valid) { 
        
        const data: UsuarioModel = {
          nombre: UsuarioNuevo.nombre || '',
          email: UsuarioNuevo.email || '',
          tipoDocumento: UsuarioNuevo.tipoDocumento || '',
          /*   formulario tiene un grupo de controles  cada input es un control*/
          numeroDocumento: UsuarioNuevo.numerodeDocumento || '',
          login: UsuarioNuevo.login || '',
          password: UsuarioNuevo.password || '',
          _id: '',
          rol: '',
          estado: false,
          // creo objeto date
          createdAt: new Date()
        };

      // le decimos al suscrubisrse que me de como tal la respuesta 
        this.usuarioService.crearUsuario(data).subscribe({
          next:(resp: any) => {
          console.log('Usuario creado', resp);
          },
          error: (error:any) => {
          console.log('Error al crear el usuario', error);
          },
        });
        console.log('datos', this.usuarioForm.value)
      }
    }
    
  cerrarF() {
    this.cerrarform.emit(false);
  }
}
