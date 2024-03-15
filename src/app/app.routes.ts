import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcercaDeComponent } from './page/acerca-de/acerca-de.component';
import { AlcanceComponent } from './page/alcance/alcance.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { QuienesSomosComponent } from './page/quienes-somos/quienes-somos.component';


export const routes: Routes = [
    {
        path: 'inicio',
        title: 'Inicio',
        component: HomeComponent,
    },
    {
        path: 'acercade',
        title: 'Quines somos',
        component: AcercaDeComponent,
    },
    {
        path: 'alcance',
        title: 'Alcance del Proyecto',
        component: AlcanceComponent,
    },
    {
        path: 'contacto',
        title: 'Contactenos',
        component: ContactoComponent,
    },
    {
        path: 'quienessomos',
        title: 'Quienes Somos',
        component: QuienesSomosComponent,
    },
];
