import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-casa',
  standalone: true,
  imports: [],
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'

})
export class CasaComponent {

  @Input() cardData: any;
}
