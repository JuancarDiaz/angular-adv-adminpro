import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public imagenSubir!:File;
  public imgVistaPrevia:string='';

constructor(  public modalImagenService:ModalImagenService,
              public fileuploadService:FileuploadService) { }



ocultarModal(){

this.modalImagenService.cerrarModal();  
this.imgVistaPrevia = '';
}




cambiarImagen( evento:any ){

  const file = evento.target.files[0] as File;

  this.imagenSubir = file;


  if( !file ){

     this.imgVistaPrevia = ''
     return;
    } 

  const reader:FileReader = new FileReader();
 
    reader.addEventListener('load', ev =>{

      const imagen:string = ev.target?.result as string;

      this.imgVistaPrevia = imagen;

    });

    reader.readAsDataURL( file );

}



subirImagen(){

  const id = this.modalImagenService.id;
  const tipo = this.modalImagenService.tipo;

  this.fileuploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img =>{

        console.log( 'imagen (nombreArchivo) =======> ', img );
        
        this.modalImagenService.nuevaImagen.emit( img );
        Swal.fire('Imagen guardada', 'Exito al almacenar la Imagen', 'success');
        this.ocultarModal();

      })
      .catch( error => {

        Swal.fire('Error', 'Error al almacenar la Imagen', 'error');

      })

}

}
