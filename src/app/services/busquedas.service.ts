import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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


  trasformarHospitales( resultados:Hospital[] ):Hospital[]{

      return resultados.map( hosp => new Hospital(hosp.nombre,hosp._id, hosp.img, hosp.usuario));
  }

  trasformarMedicos( resultados:Medico[] ):Medico[]{

    return resultados.map( hosp => new Medico(hosp.nombre,hosp._id, hosp.img, hosp.usuario));
}



  busqueda( tipo:'usuarios'|'medicos'|'hospitales', termino:string ):Observable<any>{

    const url = `${ this.baseUrl }/todo/coleccion/${ tipo }/${ termino }`;

    return this.http.get<any[]>( url, this.headers )
                    .pipe( map( ( resp:any ) => {
                
                        switch ( tipo ) {

                            case 'usuarios':

                                   return this.transformarUsuarios( resp.data );
                         
                              case 'hospitales':
                            
                                  return this.trasformarHospitales( resp.data );
            
                             case 'medicos':

                                    return this.trasformarMedicos( resp.data );

                            
             
                        

                          default:

                          return [];
                     
                        }

                              //return resp.data.map( (user:Usuario) => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ));
                        }),
                        catchError( err => of([]))
                    )



  }

}
