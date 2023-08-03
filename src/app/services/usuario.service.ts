import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../interfaces/register.form';
import { environment } from 'src/environments/environment';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuarios } from '../interfaces/cargarUsuarios.interface';
declare const google:any;


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


public usuario!: Usuario;

constructor( private http:HttpClient ,
               private router:Router
              ) { }


get token():string{

  return localStorage.getItem('token') || 'no hay token';
}

get uid(){

  return this.usuario.uid || '';
}

get headers(){
  return {
    headers:{
      'x-token':this.token
    }
  }
}

crearUsuario(  formData:RegisterForm ):Observable<any>{

    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe( tap( (resp:any) => {

                          localStorage.setItem('token', resp.token)
                        }) 
                     );

  }


login( formData:LoginForm ):Observable<any>{

  return this.http.post(`${ base_url }/auth`, formData)
                  .pipe( tap( (resp:any) => {

                          localStorage.setItem('token', resp.token)
                        }) 
                  );
}




loginGoogle( token:string ):Observable<any>{

  return this.http.post(`${ base_url }/auth/google`, { token } )
                  .pipe( tap( (resp:any) => {

                          localStorage.setItem('token', resp.tokenJWT)
                        }) 
                  );
}



validarToken(  ){

  const token = localStorage.getItem('token') || '';

  return this.http.get(`${ base_url }/auth/renew`, { 
    
    headers: {'x-token':token}

    } )
  .pipe(
         map( (resp:any) => { 
                                  console.log('renovando token', resp);
                                  
                                  const  { email, google, nombre, role, uid, img } = resp.usuario;

                                  this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
                                  
                                  localStorage.setItem('token', resp.token)
                                  
                                  return true;
                                }),
        //  map( (resp:any) => true ),
         catchError( eror => of( false ) )
  );
}


logout(){

    console.log('logout service');
    
    localStorage.removeItem('token');

    // LOGOUT de la cuenta del usuario de google
    google.accounts.id.revoke('juancardiazjuarez@gmail.com',()=>{
    this.router.navigate(['/login']);
    });

}




actualizarPerfil( data:{email:string, nombre:string, role:string} ):Observable<any>{

  data = {
    
    ...data,
    role:this.usuario.role ||''
  }

  return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, { 
                                                           headers:{'x-token': this.token}
                                                         });

}

guardarUsuario( usuario:Usuario ):Observable<any>{


  return this.http.put( `${ base_url }/usuarios/${ usuario.uid }`, usuario, { 
                                                           headers:{'x-token': this.token}
                                                         });

}




cargarUsuarios( desde:number = 0 ): Observable<CargarUsuarios>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ base_url }/usuarios?desde=${ desde }`

  return this.http.get<CargarUsuarios>( url, this.headers )
                  .pipe(
                    delay(100),
                    map( (resp:CargarUsuarios) =>{

        const usuarios = resp.usuarios.map( user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ));

        return {
                total:resp.total,
                usuarios
          };

        } 
  ))

}



eliminarUsuario( usuario: Usuario ):Observable<any>{

  const url:string = `${ base_url }/usuarios/${ usuario.uid }`

  return this.http.delete( url, this.headers );
  

}

}
