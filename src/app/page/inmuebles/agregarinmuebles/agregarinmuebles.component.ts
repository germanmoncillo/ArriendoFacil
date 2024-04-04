import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InmuebleModel } from '../../../core/models/inmueble.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { config } from '../../../../environments/configuration/config';
import { InmuebleInterface } from '../../../core/interfaces/inmueble.interface';
import { InmueblesService } from '../../../services/inmuebles/inmuebles.service';
import { VerusuariosComponent } from '../../usuarios/verusuarios/verusuarios.component';
import { VerinmueblesComponent } from '../verinmuebles/verinmuebles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarinmuebles',
  standalone: true,
  imports: [ReactiveFormsModule, AgregarinmueblesComponent, ModalComponent],
  templateUrl: './agregarinmuebles.component.html',
  styleUrl: './agregarinmuebles.component.css'
})
export class AgregarinmueblesComponent implements OnInit {

  inmuebleForm: FormGroup;
  estados = config.estado;
  editando: boolean = false;

  @Output () mostrarInmueble: EventEmitter<InmuebleInterface> = new EventEmitter<InmuebleInterface>();
  @Output () cerrarform: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private inmuebleService: InmueblesService,
    private verinmuebleComponent: VerinmueblesComponent
  ){}

  ngOnInit(): void {
    this.inmuebleForm = this.formBuilder.group({
      _id: [''],
      tipoInmueble: [''],
      fechaIngreso: [''],
      fechaPago: [''],
      valorPago: [''],
      estado: [''],
      usuario: [''],     
    });

    this.verinmuebleComponent.editarInmuebleEvent.subscribe((inmueble: InmuebleModel) => {
      this.editarInmuebleSeleccionado(inmueble);
    });
  }

  crearInmueble() {
    if (this.inmuebleForm.valid) {
      const inmuebleData = this.inmuebleForm.value;
      if(this.editando) {
        this.inmuebleService.actualizarInmueble(inmuebleData).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'editado',
              `Se actualizó el inmueble ${resp.inmueble.tipoInmueble} satisfactoriamente`,
              'success'
            );
            this.inmuebleForm.reset();
          },  
          error: (error) => {
            Swal.fire('Error', `Error al editar el usuario, ${error.error.msg}`, 'error');
          },
        });
      } else {
        delete inmuebleData._id;
        this.inmuebleService.crearInmueble(inmuebleData).subscribe({
          next: (resp: any) => {
             Swal.fire(
              'Creado',
              `Se creó el inmueble ${resp.inmueble.tipoInmueble} satisfactoriamente`,
              'success'
             );
            this.inmuebleForm.reset();
          },
          error: (error) => {
            Swal.fire('Error', `Error al crear el inmueble, ${error.error.msg}`, 'error'); 
          },
        });
      }
    } else {
      Swal.fire(
        'Error',
        `El formulario es inválido. Por favor, revise los campos`,
      );
    }
  }

  editarInmuebleSeleccionado(inmueble: InmuebleModel) {
    this.inmuebleForm.patchValue(inmueble);
    this.editando = true; 
  }

  resetForm() {
    this.inmuebleForm.reset(); // Restablecer el formulario
    this.editando= false;
  }
    
  cerrarF() {
    this.cerrarform.emit(false);//revisar si esto hace algo!!!!
  }

}
