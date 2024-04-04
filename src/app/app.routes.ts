import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { AutenticacionComponent } from './auth/autenticacion/autenticacion.component';
import { VerusuariosComponent } from './page/usuarios/verusuarios/verusuarios.component';
import { authGuard } from './guards/auth/auth.guard';
import { MiarriendoComponent } from './page/miarriendo/miarriendo.component';
import { PqrsComponent } from './page/pqrs/pqrs.component';
import { VerinmueblesComponent } from './page/inmuebles/verinmuebles/verinmuebles.component';


export const routes: Routes = [


    {
        path:'inicio', 
        title: 'Inicio',   
        component: HomeComponent
    },

    {
        path: 'contacto',
        title: 'Contactenos',
        component: ContactoComponent,
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
        path: 'contacto',
        title: 'Contactenos',
        component: ContactoComponent,
    },
    {
        path: 'inmuebles',  // cyal es el path
        title: 'Mis inmuebles',// el nombre de la pagina
        component: VerinmueblesComponent,   //componente como tal
    },
    {
        path: 'usuarios',  // cual es el path
        title: 'usuarios',// el nombre de la pagina
        component: VerusuariosComponent,   //componente como tal
    },
    {
        path: 'miarriendo',
        title: 'Mi arriendo',
        component: MiarriendoComponent,
    },
    {
        path: 'pqrs',
        title: 'pqrs',
        component: PqrsComponent,
    },
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
