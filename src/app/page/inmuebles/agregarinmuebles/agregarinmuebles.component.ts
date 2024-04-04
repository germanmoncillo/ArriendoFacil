import { Component } from '@angular/core';
import { InmuebleModel } from '../../../core/models/inmueble.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-agregarinmuebles',
  standalone: true,
  imports: [ReactiveFormsModule, AgregarinmueblesComponent, ModalComponent],
  templateUrl: './agregarinmuebles.component.html',
  styleUrl: './agregarinmuebles.component.css'
})
export class AgregarinmueblesComponent {


  // editarUsuarioSeleccionado(inmueble: InmuebleModel) {
  //   this.inmuebleForm.patchValue(inmueble);
  //   this.editando = true; 
  // }

  // resetForm() {
  //   this.inmuebleForm.reset(); // Restablecer el formulario
  //   this.editando= false;
  // }
    
  // cerrarF() {
  //   this.cerrarform.emit(false);//revisar si esto hace algo!!!!
  // }

}
