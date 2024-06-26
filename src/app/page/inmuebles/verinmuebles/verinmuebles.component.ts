import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AgregarinmueblesComponent } from '../agregarinmuebles/agregarinmuebles.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { InmuebleModel } from '../../../core/models/inmueble.model';
import { Subscription } from 'rxjs';
import { InmueblesService } from '../../../services/inmuebles/inmuebles.service';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { config } from '../../../../environments/configuration/config';
import { InmuebleInterface } from '../../../core/interfaces/inmueble.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verinmuebles',
  standalone: true,
  imports: [AgregarinmueblesComponent, ModalComponent, FormsModule],
  templateUrl: './verinmuebles.component.html',
  styleUrl: './verinmuebles.component.css'
})

export class VerinmueblesComponent implements OnInit, OnDestroy {

  @ViewChild(AgregarinmueblesComponent) agregarInmueblesComponent: AgregarinmueblesComponent; //aqui le decimos que queremos ver al hijo(agregarusuarios) y con este viewcild podemos usar la funcion que agregamos allá!

  inmuebleSubscription: Subscription
  inmuebles: InmuebleModel[] = [];
  inmueble: InmuebleModel;
  usuarioLogin: UsuarioModel;
  roles = config.roles; 
  estados = config.estado;
  searchTerm: string = '';
  filteredData: any[] = [];

  @Output() editarInmuebleEvent: EventEmitter<InmuebleModel> = new EventEmitter<InmuebleModel> ();

// este va en el html
  inmuebleEliminar: string = '';
  usuarios: any;

  constructor (  
    private inmuebleService: InmueblesService,
    private autenticacionService: AutenticacionService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    this.usuarioLogin = this.autenticacionService.usuario; //para realizar una autentificación del usuario que crea esto
    this.cargarInmuebles();
  }

  ngOnDestroy(): void {
    this.inmuebleSubscription?.unsubscribe();
  }
  
  recibirData(nuevoInmueble: InmuebleInterface) {
    this.inmuebles.push(nuevoInmueble);
    }

  cargarInmuebles() {
    this.inmuebleSubscription = this.inmuebleService.consultarInmueble().subscribe((resp: any) => {
      this.inmuebles = resp.inmuebles;
      this.filteredData = this.inmuebles;
    });
  }

  eliminarInmueble(id: string) {
    this.inmuebleService.eliminarInmueble(id).subscribe( {
      next: () => {
      this.cargarInmuebles();
      Swal.fire(
        'Eliminado',
        `Se elimino el inmueble`,
        'success'
      );
    this.funcionCerrar2();
    },
      error: (error) => {
      Swal.fire(
      'Error',
      error.error.msg,
      'error',      
      ) 
      }
    });
  }

  actualizarEstadoInmueble(inmueble: InmuebleModel) {
    this.inmuebleService.actualizarInmueble(inmueble).subscribe((resp: any) => {
      Swal.fire(
        'Actualizado',
        `Se actualizó el inmueble ${resp.inmueble.tipoInmueble}`,
        'success'
      );
    });
  }
 
    //AGREGANDO MODAL
  
  modalAbrir:boolean= false;
  modalAbrir2:boolean= false;

    funcionAbrir(){
      this.modalAbrir=true;
    }

    funcionAbrir2(inmueble: InmuebleModel){
      this.modalAbrir2=true;
      this.inmuebleEliminar=inmueble._id;
    }

    funcionCerrar(){
      this.modalAbrir=false;
      this.agregarInmueblesComponent.resetForm();
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
        this.filteredData = [...this.inmuebles];
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
      this.filteredData = this.inmuebles.filter((item: any) => {
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

    editarInmueble(inmueble: InmuebleModel) {
      this.funcionAbrir();
      this.editarInmuebleEvent.emit(inmueble);
    }
}
