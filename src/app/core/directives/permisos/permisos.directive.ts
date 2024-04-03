import { Directive,Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Subject, merge, takeUntil } from 'rxjs';

@Directive({
  selector: '[appPermisos]' , // Ejemplo de seleccionar un texto 
  // si estan usando modulos le dice que si o si no que no 
  standalone: true,

  
})

export class PermisosDirective implements OnInit , OnDestroy {

  @Input('appPermisos',) permisos:string[];
  
  private dessuscribirse = new Subject<void>();

  constructor(
    private templateRef :TemplateRef<any>,
    //ese view container me permite ver y demas 
    private viewContainer: ViewContainerRef,
    //inyectando los permisos de los usuarios 
    private autenticacionService: AutenticacionService
    //template
    ) {}

    // cuando se actualiza la pagina con el NGOniit
  ngOnInit(): void {
  
    const loginLogoutObservable = merge(
      // cuando nos logeemos creamos el evento que esta en el otro compomente 
      this.autenticacionService.onLogin,
      this.autenticacionService.onLogout

      //hace misma funcion cuando me logea o me desloguea me oculta en los diferentes elementos 
      // amas actualizar cada que se hace cuando logeo 
    );
    // esta suscripcion va a ocurrir hasta  desucribirme, hacer ese evento hasta que me quite la suscripcion
    loginLogoutObservable.pipe(takeUntil(this.dessuscribirse)).subscribe(() => {
      this.actualizarVista();
    });
    this.actualizarVista();
  }
// set es para traer informacion

    // cuando se eejctua la accion desde el hader llamo la directiva , hago un NgOinit cuando termin
    // no hace nada el header llama la directiva la usa y la suelta 
  ngOnDestroy(): void {
   this.dessuscribirse.next();
   this.dessuscribirse.complete();

  }
  //Este método verifica los permisos del usuario actual y decide si se
 // debe mostrar el contenido de la directiva en función de esos permisos. 
  //Si el usuario tiene permisos adecuados, se crea una vista incrustada utilizando 
  private actualizarVista(): void {
    // obeteniendo usuario del local storage
    const usuarioString = localStorage.getItem('usuario');
    //si hay un usuario string haga un parseo es para vovler un objeto 
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;
    
    if (usuario && usuario.rol) {
      const rol = usuario.rol;

       // si encuentra el rol lo que me hace es mostrarme lo que tengo en el contenido "¨aspermiso con el rol"
       // Si se especifica un rol para mostrar y el usuario tiene ese rol, muestra el contenido   
       if (this.validarPermisos(rol)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
    // Si no se especifica ningún rol y tampoco se especifican permisos, muestra el contenido
    else if((!usuario || !usuario.rol) && (!this.permisos || this.permisos.length === 0)){
      this.viewContainer.createEmbeddedView(this.templateRef);
      // Si no se especifica ningún rol y tampoco se especifican permisos, muestra el contenido
    } else if (usuario && this.permisos && this.permisos.length > 0 && this.validarPermisos(usuario.rol)) {
    // Si se especifican permisos y el usuario tiene esos permisos, muestra el contenido
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
     else {
       // En cualquier otro caso, oculta el contenido
      this.viewContainer.clear();
    }
    

  }
 
 //condicionar para mostrar segun el permiso del suuario
private validarPermisos(rol:string): boolean {
 
  // cuando encuentro el primero dejo de recorrer el some
  return this.permisos.some((permiso) => permiso === rol.toUpperCase());



}


}