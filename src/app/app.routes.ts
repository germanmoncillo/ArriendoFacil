import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcercaDeComponent } from './page/acerca-de/acerca-de.component';
import { AlcanceComponent } from './page/alcance/alcance.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { QuienesSomosComponent } from './page/quienes-somos/quienes-somos.component';
import { RegistroComponent } from './page/registro/registro.component';
import { VerclientesComponent } from './page/clientes/verclientes/verclientes.component';
import { AutenticacionComponent } from './auth/autenticacion/autenticacion.component';
import { AgrearusuariosComponent } from './page/usuarios/agrearusuarios/agrearusuarios.component';
import { VerusuariosComponent } from './page/usuarios/verusuarios/verusuarios.component';
import { authGuard } from './guards/auth/auth.guard';
import { UsuarioModel } from './core/models/usuario.model';


export const routes: Routes = [


    {
        path:'inicio', 
        title: 'Inicio',   
        component: HomeComponent
   },
    
    
    {
        path: 'auth',
        title:"autenticacion",
        children:[
            { path: 'login',component: AutenticacionComponent },
          
        ],
    },

    {
        path: 'inicio',
        title: 'Inicio',
        canActivate: [authGuard],
        children: [
  
    {
        path: 'acercade',
        title: 'Quienes somos',
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
    {
        path: 'registro',
        title: 'Registro',
        component: RegistroComponent,
    },
    {
        path: 'cliente',  // cyal es el path
        title: 'clientes potenciales',// el nombre de la pagina
        component: VerclientesComponent,   //componente como tal
    },

    {
        path: 'usuarios',  // cual es el path
    title: 'usuarios',// el nombre de la pagina
    component: VerusuariosComponent,   //componente como tal

    }
    // {
    //     path: 'login',  // cyal es el path o ruta
    //     title: 'Autenticacion',// el nombre de la pagina
    //     component: AutenticacionComponent,   //componente como tal
    // }

],
},
// si no cuenta con la ruta , redirecciona al login
{path: '**',redirectTo:'inicio', pathMatch:'full'},
];
