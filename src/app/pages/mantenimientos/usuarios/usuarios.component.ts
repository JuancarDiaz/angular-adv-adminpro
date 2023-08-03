import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { LogarithmicScale } from 'chart.js';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  

  public totalUsuarios: number = 0;
  public usuarios:Usuario[]=[];
  public desde:number = 0;
  public cargando:boolean = true;
  public usuariosTemp:Usuario[]=[];
  public imagenSubs!:Subscription;



  constructor( private usuarioService:UsuarioService,
               private busquedasService:BusquedasService,
               private modalImagenService:ModalImagenService
                ){ }


  ngOnDestroy(): void {
    
    this.imagenSubs.unsubscribe();
  }


  
  ngOnInit(): void {

    this.cargarUsuarios();

    this.imagenSubs = this.modalImagenService.nuevaImagen.subscribe( img => {

      this.cargarUsuarios();
    });
        
  }


cargarUsuarios(){
    

    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde ).subscribe( ({ total, usuarios }) => {
      
      if( usuarios.length  !== 0){
        
            this.usuarios = usuarios;
            this.usuariosTemp = [...usuarios];

        }

            this.totalUsuarios = total;  
            this.cargando = false;
    });

  

}



cambiarPagina( valor:number ){


    this.desde += valor;

    if( this.desde < 0 ){
     
        this.desde = 0;

    }else if( this.desde > this.totalUsuarios ){

        this.desde -= valor;

    }

    this.cargarUsuarios();
    
} 



buscar( termino:string ){

     console.log( termino );

     if( termino.length === 0 ){ this.usuarios = [ ...this.usuariosTemp ];}


     this.busquedasService.busqueda('usuarios',termino).subscribe( ( data:any[] ) => {
      
          this.usuarios = data;

     } )

}



eliminarUsuario( usuario:Usuario){

  console.log('eliminando usuario');
  console.log('uid ', this.usuarioService.uid);
  

  if( usuario.uid === this.usuarioService.uid ){ Swal.fire('Error','No puede borrar a ese usuario'); return}

  Swal.fire({
    title: '¿Borrar el usuario?',
    text: `estas a punto de borrar a ${ usuario.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'si, borrarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      // Swal.fire(
      //   'Deleted!',
      //   'Your file has been deleted.',
      //   'success'
      // )
      this.usuarioService.eliminarUsuario( usuario ).subscribe( usuario =>{

            Swal.fire(
                'Deleted!',
                `el usuario ${ usuario.nombre } fue borrado correctamente`,
                'success'
              );

              this.cargarUsuarios();

      });
    }
  })

}

cambiarRole( usuario:Usuario ){

    
  this.usuarioService.guardarUsuario( usuario ).subscribe( resp => {
     
    console.log( resp )
  })
    
}


abrirModal( usuario:Usuario ){

  console.log(usuario);
  this.modalImagenService.abrirModal( 'usuarios', usuario.uid!, usuario.img );
}

}
