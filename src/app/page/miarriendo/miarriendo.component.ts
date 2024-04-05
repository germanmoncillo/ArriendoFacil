import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { InmueblesService } from '../../services/inmuebles/inmuebles.service';

@Component({
  selector: 'app-miarriendo',
  standalone: true,
  imports: [],
  templateUrl: './miarriendo.component.html',
  styleUrl: './miarriendo.component.css'
})
export class MiarriendoComponent implements OnInit {
  
  usuario: any;

  constructor (
    private consultaUsuarioInmueble: InmueblesService,
  ) {}
  
  //permite cargar cuando traigamos/carguemos componente
  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    
    if (usuarioString) {
      const usuario: any = JSON.parse(usuarioString);

      if (usuario._id) { 
        this.consultaUsuarioInmueble.consultarUsuarioInmueble(usuario._id).subscribe({
          next: (resp: any) => {
            this.usuario = resp.usuarioInmueble;
            console.log("Esto es consultar usuario inmueble", this.usuario);
          },
          error: (error) => {
            console.error('error al obtener usuario', error);
          }
        })
      }

    }
  }

  

  

  //crear inmueble
  // inmueble: inmuebleModel;  

  //desde getUnInmueble;

  //ngOninit 
  //agarrar id (directive)

}
