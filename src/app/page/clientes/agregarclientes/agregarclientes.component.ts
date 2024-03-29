import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../core/interfaces/cliente';
import { CLienteModel } from '../../../core/models/cliente.model';
import { ClientesService } from '../../../services/clientes/clientes.service';


@Component({
  selector: 'app-agregarclientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregarclientes.component.html',
  styleUrl: './agregarclientes.component.css'
})
export class AgregarclientesComponent {
  
  clienteForm = new FormGroup({
    // id: new FormControl("",Validators.required), 
    nombre: new FormControl("",Validators.required),  
    telefono: new FormControl('',[Validators.required]),  
    email: new  FormControl('',[Validators.email,Validators.required]),
    direccion: new FormControl('',Validators.required),
    tipoDocumento: new  FormControl('',[Validators.required]),                     /*   formulario tiene un grupo de controles  cada input es un control*/
    numerodeDocumento: new FormControl('',[Validators.required]),
    // estado: new FormControl(true,Validators.required), 
  });

  @Output () mostrarClientes: EventEmitter<Cliente> = new EventEmitter<Cliente>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
@Output () cerrarform:EventEmitter<boolean> = new EventEmitter<boolean>;

// constructor creacion
constructor(private clienteService: ClientesService){}


crearcliente (){

  // ahora cogo mi formulario y lo mando a una constante

  const clienteNuevo = this.clienteForm.value;
// del api lo mande al mongo desde aca del front
// ese if me garantiza que el formualrio este lleno como tal 

// valido que las directrises de mas arriba
if(this.clienteForm.valid) {
// traeme los valores del formulario

//cogo mi data de cliente y organizo la informacion
const data: CLienteModel = {
  nombre: clienteNuevo.nombre || '',
  telefono: Number(clienteNuevo.telefono),
  email: clienteNuevo.email || '',
  tipoDocumento: clienteNuevo.tipoDocumento || '',
  numeroDocumento: clienteNuevo.numerodeDocumento || '',
  direccion: clienteNuevo.direccion || '',
 
};



// le decimos al suscrubisrse que me de como tal la respuesta 
this.clienteService.crearClientes(data).subscribe({
next:(resp: any) => {
  console.log('Usario creado', resp);

},
error: (error:any) => {
  console.log('Error al crear el cliente', error);
},
});

console.log('datos', this.clienteForm.value)
}

 
  }
  cerrarF() {
  this.cerrarform.emit(false);
  }



}
