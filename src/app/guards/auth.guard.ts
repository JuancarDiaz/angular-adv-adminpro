import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { Subscriber, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const userService  = inject(UsuarioService);
  const router = inject(Router);
  let estado:boolean = false;

  console.log('CanActivateFn funcionando');


    return  userService.validarToken().pipe( 

        tap( estaAutenticado => {

            if( !estaAutenticado ){
              return true
            }else{
              return false
            }

        })

      );


};
