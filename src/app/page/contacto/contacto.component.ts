import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactoService } from '../../services/contacto/contacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent implements OnInit {

  //inicializar formulario vacio como lleno
  contactoForm: FormGroup;

  constructor (private formBuilder: FormBuilder, private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.contactoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      mensaje: ['Mensaje Por defecto', Validators.required]
    });
  }

  enviarContacto() {
    Swal.fire({
      title: 'Enviando formulario',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    if (this.contactoForm.valid) {
      this.contactoService.enviarFormularioContacto(this.contactoForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: 'Solicitud enviada',
            text: 'Se ha enviado su solicitud de forma exitosa',
            icon: 'success'
          });
          this.contactoForm.reset();
        }, 
        error: (error) => {
          Swal.fire({
            title: 'Solicitud no enviada',
            text: error.error.msg,
            icon: 'error'
          });
        }
      });
    } else {
      console.log("Formulario invalido"); 
    }
  }
}