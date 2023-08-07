import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo:'usuarios'|'medicos'|'hospitales'): string {
    
    if( img?.includes('https')) return img;
          
             
    if( img ){

               return `${ environment.base_url }/uploads/${ tipo }/${ img }`
    }else{

               return `${ environment.base_url }/uploads/usuarios/nodisponible.png`
    }
    
  }

}
