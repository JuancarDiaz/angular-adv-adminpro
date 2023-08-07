import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Hospital } from 'src/app/models/hospital.model';
import { FileuploadService } from '../../../services/fileupload.service';
import { delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit{

  public medicos:Medico[]=[];
  public cargando:boolean=true;
 

  constructor( private medicoService:MedicoService,
               private modalImagenService:ModalImagenService,
               private fileuploadService:FileuploadService,
               private busquedasService:BusquedasService,
                ){

  }


  ngOnInit(): void {

    this.cargarMedicos();

    
  }




  cargarMedicos(){

      
      this.medicoService.cargarMedicos( ).subscribe( medicos => {

        this.cargando = false;
        console.log('medicos', medicos )
        this.medicos = medicos;
        
      })

  }


  abrirModal(medico:Medico){

    console.log(medico);
    this.modalImagenService.abrirModal( 'medicos', medico._id!, medico.img);
    this.modalImagenService.nuevaImagen.pipe(delay(100)).subscribe( img => {

      console.log('imagen--------------->', img )
        this.cargarMedicos();
    });

  }


  busquedas( termino:string ){

    if( termino.length <= 0 ){
      
       this.cargarMedicos();
    }

    this.busquedasService.busqueda('medicos', termino ).subscribe( medicos => {

      this.medicos = medicos;
    })

  }


  borrarMedico( medico:Medico ){



  Swal.fire({
    title: '¿Borrar el usuario?',
    text: `estas a punto de borrar a ${ medico.nombre }`,
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
      this.medicoService.borrarMedico( medico._id! ).subscribe( medico => {

            Swal.fire(
                'Medico borrado!',
                `el usuario ${ medico.nombre } fue borrado correctamente`,
                'success'
              );

              this.cargarMedicos();

      });
    }
  })


  }
}
