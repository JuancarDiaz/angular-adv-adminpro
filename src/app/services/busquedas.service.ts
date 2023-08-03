import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  public baseUrl:string = environment.base_url;

  constructor( private http:HttpClient) { }


  get token():string{

    return localStorage.getItem('token') || 'no hay token';
  }
  
  
  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }


  transformarUsuarios( resultados:any[] ):Usuario[]{

      return resultados.map( (user:Usuario) => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) )
  }










  busqueda( tipo:'usuarios'|'medicos'|'hospitales', termino:string ){

    const url = `${ this.baseUrl }/todo/coleccion/${ tipo }/${ termino }`;

    return this.http.get<any[]>( url, this.headers )
                    .pipe( map( ( resp:any ) => {
                
                        switch ( tipo ) {

                            case 'usuarios':

                                   return this.transformarUsuarios( resp.data );
                         
                            // case 'hospitales':
                            
            
                            // case 'medicos':
                            
             
                        

                          default:

                          return [];
                     
                        }

                              //return resp.data.map( (user:Usuario) => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ));
                        })
                    )



  }

}
