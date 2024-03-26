import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { ROUTER_APP } from '../../core/enum/router.app';


@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})

export class AutenticacionComponent implements OnInit{
  loginForm!: FormGroup;
  router: any;
 
  constructor(
     private formBuilder: FormBuilder,
     private autenticacionService: AutenticacionService ,
     private ruta: Router
     ) {}

  
  ngOnInit(): void {
    // aqui digo en donde el campo de validatos que con un correo se autentica 
    this.loginForm = this.formBuilder.group({
      login:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(5)]],
    });
  }

  get login(){
    return this.loginForm.get('login');
  }

  get password(){
    return this.loginForm.get('password');
  }
 
realizarlogin(){
  if (this.loginForm.invalid) {
  return;
  }

// agarro la informacion la envio en la data es la constante 
  const data=this.loginForm.value;
  // this.aService.login(data).subscribe({
  //   next:(response:any ) => {
  //     if(response && response.usuario){
  //       this.ruta.navigateByUrl('')
  //     }
  //   },
  //   error:(error:any) => {
  //     console.log(error.msg);
  //   },
    
  // });

this.autenticacionService.login(data).subscribe({
  next:(resp: any) => {
    if ( resp && resp.usuario){
      const {nombre, login, email} =  resp.usuario;

      Swal.fire({
        html: `Bienvenido ${nombre}`,
      }).then(()=> {
        this.ruta.navigateByUrl(ROUTER_APP.USUARIOS);        
      });
      }
    },
    error:(error: any) => {
      console.error(error.error.msg);
      }
    });
  }
}
