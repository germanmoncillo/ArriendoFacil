import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
@Output () incrementarValor: EventEmitter<number> = new EventEmitter<number>();

contador: number = 0;
incremento() { //una funcion llamada incremento va a contar y incrementar un valr 
  console.log("contador - Hijo",this.contador);
this.contador++;
this.incrementarValor.emit(this.contador); // manera para que aparezca alla en consola
}
}
