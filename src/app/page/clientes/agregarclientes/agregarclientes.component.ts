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
    numeroDocumento: new FormControl('',[Validators.required]),
    // estado: new FormControl(true,Validators.required), 
  });


  //emite eventos hacia afuera del componente de agregar clientes y envia un objeto tipo cliente cliente son las 
//las varibaels cliente 
  @Output () mostrarClientes: EventEmitter<Cliente> = new EventEmitter<Cliente>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
@Output () cerrarform:EventEmitter<boolean> = new EventEmitter<boolean>;

// constructor creacion
constructor(private clienteService: ClientesService){}

// Este método se invoca cuando se envía el formulario para crear un nuevo cliente. 
// Se verifica si el formulario es válido y luego se obtienen los valores del formulario
//  para crear un nuevo objeto ClienteModel. Luego se utiliza el servicio ClientesService para enviar los datos al servidor.
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
  numeroDocumento: clienteNuevo.numeroDocumento || '',
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

  //cerrando modal 
  cerrarF() {
  this.cerrarform.emit(false);
  }



}
