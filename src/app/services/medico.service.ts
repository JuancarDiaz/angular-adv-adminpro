import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  public baseUrl = environment.base_url;
  
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




crearMedico( medico:{nombre:string, hospital:string} ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/medicos`

  return this.http.post( url, medico, this.headers )
}




actualizarMedico( medico:Medico): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/medicos/${ medico._id }`

  return this.http.put( url, medico, this.headers )
}




borrarMedico( _id:string, ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/medicos/${ _id }`

  return this.http.delete( url, this.headers )
}





cargarMedicos(): Observable<any>{ 

  const url = `${ this.baseUrl }/medicos`

  return this.http.get<{ok:boolean, medicos:Medico[]}>( url, this.headers )
                  .pipe(
                        delay(100),
                        map( (resp:{ok:boolean, medicos:Medico[]}) => resp.medicos )
                       )

}


obtenerMedicoById( id:string ):Observable<Medico> {

  const url = `${ this.baseUrl }/medicos/${ id }`

  return this.http.get<{ok:boolean, medico:Medico}>( url, this.headers )
                  .pipe(
                        map( (resp:{ok:boolean, medico:Medico}) => resp.medico )
                       )
}


}
