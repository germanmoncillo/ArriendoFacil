import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../core/interfaces/cliente';

@Component({
  selector: 'app-agregarclientes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agregarclientes.component.html',
  styleUrl: './agregarclientes.component.css'
})
export class AgregarclientesComponent {
  clienteForm = new FormGroup({
    id: new FormControl("",Validators.required), 
    nombre: new FormControl("",Validators.required),  
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',[Validators.required]),  
    tipoDocumento: new  FormControl('',[Validators.required]),                     /*   formulario tiene un grupo de controles  cada input es un control*/
    numerodeDocumento: new FormControl('',[Validators.required]),
    estado: new FormControl(true,Validators.required), 
    email: new  FormControl('',[Validators.email,Validators.required]),
  });

  @Output () mostrarClientes: EventEmitter<Cliente> = new EventEmitter<Cliente>(); //ngular que se utiliza para marcar propiedades de salida en un componente.
@Output () cerrarform:EventEmitter<boolean> = new EventEmitter<boolean>;
  crearcliente (){
    const data = this.clienteForm.value;
    const nuevoCliente: Cliente ={
      _id: Number(data.id),
      nombre: data.nombre || "",
      direccion: String(data.direccion),
      telefono: String(data.telefono),
      tipoDocumento: String(data.tipoDocumento),
      numeroDocumento: String(data.numerodeDocumento),
      estado: Boolean(data.estado),
      email: String(data.email),
    };
     this.mostrarClientes.emit(nuevoCliente);
   console.log('datos eminitdoa al padre', nuevoCliente);
 
  }
  cerrarF() {
  this.cerrarform.emit(false);
  }



}
