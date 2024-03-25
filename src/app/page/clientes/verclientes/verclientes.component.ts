import { Component, OnInit } from '@angular/core';
import { AgregarclientesComponent } from '../agregarclientes/agregarclientes.component';
import { ModalComponent } from "../../../components/modal/modal.component";
import { Cliente } from '../../../core/interfaces/cliente';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-verclientes',
    standalone: true,
    templateUrl: './verclientes.component.html',
    styleUrl: './verclientes.component.css',
    imports: [ AgregarclientesComponent, ModalComponent]
})
export class VerclientesComponent implements OnInit {

  misClientes: Cliente []=[];

  // // en el constructor creo o traigo servicio que cree
  // constructor( private clienteService: ClientesService) {}
  
  constructor( private clienteService: ClientesService, private router: Router) {}
  
  
ngOnInit(): void {
  

 // interaccion de clientes//
 this.misClientes.forEach((cliente)=> {
   console.log('Mis clientes', cliente);
  });

  // esta pendiente de los clinetes con ese
this.clienteService.getClientes().subscribe((data: any)=> {
console.log(data);
this.misClientes = data.clientes;

 });

  }
  eliminarClientes(idcliente : number): void {
   this.misClientes = this.misClientes.filter (
    (cliente)=> cliente._id !== idcliente
   )
/* llamo a mis clientes recorro ese arreglo filter filtra la varibale se llama clinete  del cluiete
le filtro el id  debe ser diferente al id que le estoy enviando como parametro */
    console.log("Eliminar",this.misClientes);
}


recibirData (nuevoCliente: Cliente) {
  this.misClientes.push(nuevoCliente);
  console.log('Datos recibidos del hijo:', nuevoCliente);
}


  // AGREGANDO MODAL

  modalAbrir:boolean= false;
funcionAbrir(){
  this.modalAbrir=true;
}
funcionCerrar(){
  this.modalAbrir=false;
}

cerrarboton(evento:boolean){
  this.modalAbrir=false;
}

}

