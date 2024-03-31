import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlickCarouselModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  mostrarApartamentos: boolean = true;
  mostrarCasas: boolean = false;
  mostrarLocal: boolean = false;
  tipoInmueble: string = '';

  ngOnInit(): void {
  }

  cambiarVisibilidadInmuebles(tipo: string) {
    if (tipo === 'casa') {
      this.mostrarApartamentos = false;
      this.mostrarCasas = true;
      this.mostrarLocal = false;
    } else if (tipo === 'apartamento') {
      this.mostrarCasas = false;
      this.mostrarApartamentos = true;
      this.mostrarLocal = false;
    } else if (tipo === 'locales') {
      this.mostrarCasas = false;
      this.mostrarApartamentos = false;
      this.mostrarLocal = true;
    }
    else {
      this.mostrarCasas = true;
      this.mostrarApartamentos = true;
    }
  }


  //caputra el evento recibo el evento y le aplico 
  // cambiar visibilidad inmuebles
  onTipoInmuebleChange(event: any) {
    this.tipoInmueble = event.target.value;
    this.cambiarVisibilidadInmuebles(this.tipoInmueble);
  }
}