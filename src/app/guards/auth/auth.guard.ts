import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { ROUTER_APP } from '../../core/enum/router.app';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const autenticacionService = inject (AutenticacionService);
const router = inject(Router);

// si la respuesta de validateTOken es true o es false 
return autenticacionService.validateToken().pipe(
  //validar si el Isautenticado existe como tal
    tap((isAutenticado) =>  {
      if(!isAutenticado) {
      router.navigateByUrl(ROUTER_APP.AUTENTICACION);
      }
    })
  );
};
