import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';

@Directive({
  selector: '[appPermisos]', // Ejemplo de seleccionar un texto 
  // si estan usando modulos le dice que si o si no que no 
  standalone: true,
})
export class PermisosDirective implements OnInit{

 
private usuario: UsuarioModel;
//permisos es un array vacio
private  permisos = [];
  Permisos: string[];


  constructor(
    private templateRef :TemplateRef<any>,
    private elementRef: ElementRef,
    //ese view container me permite ver y demas 
    private viewContainer: ViewContainerRef,
    //inyectando los permisos de los usuarios 
    private autenticacionService: AutenticacionService,
    //template
   
    ) {}

    
ngOnInit(): void {
// en loa varibale usuario me estoy llevando el token como tal , Guardamee en el usuaioro lo que este hay 

this.usuario = this.autenticacionService.usuario;
this.actualizarVista();
}

// set es para traer informacion
@Input()

set appPermisos(val: Array<string>){
  this.Permisos = val;
}

private actualizarVista(): void {
  //limpiar la pared antes de hacer el diseño
  this.viewContainer.clear();
// lo vamos a llamar aca ahora 
//valido permisos
if (this.validarpermisos()){
  //le decimos embeba o escriba lo que esta en el templated o elemento elemento ref
  this.viewContainer.createEmbeddedView(this.templateRef)
}


}
 //condicionar para mostrar segun el permiso del suuario
private validarpermisos(): boolean {
  let permiso: boolean = false


  console.log("usuario Login",this.usuario)


  // miramos si el usuario existe y si tiene permisos el usuario // si tiene un rol puede ingrear 
  if(this.usuario && this.usuario.rol){
    for(let rol of this.permisos){
      if(this.usuario.rol.toUpperCase() === rol){
        console.log("usuario",this.usuario.rol,"Permisos que se estan iterando");
        permiso = true;
        return permiso;
       
      }
    }
  }
return permiso;
}
}