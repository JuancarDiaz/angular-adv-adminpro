import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

constructor() { }


async actualizarFoto(
                       archivo:File,
                       tipo:'usuarios'|'medicos'|'hospitales',
                       id:string
                    ) {

      try{

          const url = `${ environment.base_url }/uploads/${ tipo }/${ id }`

          const formdata:FormData = new FormData();

          formdata.append('imagen', archivo);

          const resp = await fetch( url, {
                                          'method':'PUT',
                                           headers:{

                                              'x-token': localStorage.getItem('token') ||'' 
                                            },
                                           body: formdata
                                        });

        

        const data = await resp.json();

        console.log( data );

        if( data.ok ){

                  console.log( 'ok->', data.msg );
                  return data.nombreArchivo; 
        }else{
                  console.log('ko->', data.msg );
                  throw Error('error al subir el archivo');

        }
      }catch( err ){

          console.log( err );
          // throw new Error('errorico salvaje')
          throw Error('error al subir el archivo');
      }
}


}
