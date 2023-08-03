import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal:boolean = true;
  public tipo:'medicos'|'hospitales'|'usuarios'='usuarios';
  public id:string='';
  public img?:string='';
  public base_url:string = environment.base_url;
  public nuevaImagen:EventEmitter<string> = new EventEmitter<string>();

  constructor( ) { }

  get ocultarModal(){

     return this._ocultarModal;
     }

  abrirModal(
                tipo:'medicos'|'hospitales'|'usuarios',
                id:string,
                img:string = 'no-existe-img'
             ){ 
    
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if( img?.includes('https')){

      this.img = img;
    
    }else{

      this.img = `${ this.base_url }/uploads/${ tipo }/${ img }`
    }
   // this.img = img;
}




  cerrarModal(){

    this._ocultarModal = true;
  }

}
