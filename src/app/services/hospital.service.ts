import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


public baseUrl = environment.base_url;

constructor( private http:HttpClient ) { }


  
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



crearHospital( nombre:string ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/hospitales`

  return this.http.post( url, {nombre}, this.headers )
}


actualizarHospital( _id:string, nombre:string ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/hospitales/${ _id }`

  return this.http.put( url, { nombre }, this.headers )
}


eliminarHospital( _id:string, ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/hospitales/${ _id }`

  return this.http.delete( url, this.headers )
}





cargarHospitales( desde:number = 0 ): Observable<any>{ //Observable<{ total:number, usuarios:Usuario[] }>

  const url = `${ this.baseUrl }/hospitales`

  return this.http.get<{ hospitales: Hospital[], msg: string, ok: boolean }>( url, this.headers )
                  .pipe(
                        map( ({hospitales})=> hospitales)
  )

}

}
