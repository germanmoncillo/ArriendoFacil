import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
// el modal esta en falso es abrir Modal

  @Input() aModal:boolean = false; 
  @Output() cModalevent=new EventEmitter<void>();
  // cerrar modal
 cModal(){
  this.aModal=false;
  this.cModalevent.emit();
 }



}
