import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcercaDeComponent } from './page/acerca-de/acerca-de.component';
import { AlcanceComponent } from './page/alcance/alcance.component';
import { ContactoComponent } from './page/contacto/contacto.component';
import { QuienesSomosComponent } from './page/quienes-somos/quienes-somos.component';
import { RegistroComponent } from './page/registro/registro.component';
import { VerclientesComponent } from './page/clientes/verclientes/verclientes.component';
import { AutenticacionComponent } from './auth/autenticacion/autenticacion.component';
import { authGuard } from './guards/auth/auth.guard';
import { AgrearusuariosComponent } from './page/usuarios/agrearusuarios/agrearusuarios.component';
import { VerusuariosComponent } from './page/usuarios/verusuarios/verusuarios.component';


export const routes: Routes = [
    {
        path: 'auth',
        title:"Autenticación",
        children:[
            { 
                path: 'login',
                title:"Iniciar sesión",
                component: AutenticacionComponent
            },    
        ],
    },
    {
        path: 'inicio',
        title: 'Inicio',
        canActivate: [authGuard],
        children: [
            {
                path:'', 
                 title: 'Inicio',   
                 component: HomeComponent
            },
            { 
                path: 'usuarios',
                title:"Ver Usuarios",
                component: VerusuariosComponent
            },
            { 
                path: 'agregarusuario',
                title:"Agregar Usuarios",
                component: AgrearusuariosComponent
            },
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
    ],
},
// si no cuenta con la ruta , redirecciona al login
{path: '**', redirectTo:'auth/login', pathMatch:'full'},

];
