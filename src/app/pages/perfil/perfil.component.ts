import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

public perfilForm!:FormGroup;
public usuario!:Usuario;
public imagenSubir!:File;
public imgVistaPrevia:string='';


constructor( private fb:FormBuilder,
             private usuarioService:UsuarioService ,
             private fileuploadService:FileuploadService
            ) { 

              this.usuario = usuarioService.usuario;
   

             }

ngOnInit(): void {

      this.perfilForm = this.fb.group({

          nombre: [ this.usuario.nombre, Validators.required ],
          email: [ this.usuario.email, Validators.email ]
      });
}


actualizarPerfil(){

    console.log( this.perfilForm.value );// {email, nombre, role: '' }

    const { nombre, email } = this.perfilForm.value;

    this.usuarioService.actualizarPerfil( this.perfilForm.value ).subscribe( () =>{
                        

             Swal.fire('Guardado','Cambios fueron guardados', 'success');

                        this.usuario.nombre = nombre; // al obtener el usuario por referencia del servicio que es singleton se actualiza en todos los sitios
                        this.usuario.email = email;

    },
      (error)=>{

             Swal.fire('Error',error.error.msg , 'error');

           }
        );
}



cambiarImagen( evento:any ){

  const file = evento.target.files[0] as File;

  this.imagenSubir = file;


  if( !file ){

     this.imgVistaPrevia = this.usuario.imagenURL
     return;
    } 

  const reader:FileReader = new FileReader();
 
    reader.addEventListener('load', ev =>{

      const imagen:string = ev.target?.result as string;

      console.log( imagen,'imangen' );

      this.imgVistaPrevia = imagen;

    });

    reader.readAsDataURL( file );






}



subirImagen(){

  this.fileuploadService
      .actualizarFoto( this.imagenSubir,'usuarios', this.usuario.uid! )
      .then( img =>{
        
        this.usuario.img = img;

        Swal.fire('Imagen guardada', 'Exito al almacenar la Imagen', 'success');

      })
      .catch( error => {

        Swal.fire('Error', 'Error al almacenar la Imagen', 'error');

      })

}






}
