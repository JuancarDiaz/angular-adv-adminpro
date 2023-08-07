import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {


  public respaldoHospitales:Hospital[]=[];
  public hospitales: Hospital[]=[];
  public cargando: boolean=false;

  constructor( private hospitalService:HospitalService,
               private modalImagenService:ModalImagenService,
               private busquedasService:BusquedasService ) {}


  ngOnInit(): void {

          this.cargarHospitales();
  }



cargarHospitales(){

        this.hospitalService.cargarHospitales().subscribe( hospitales =>{

          this.cargando = true;
          this.hospitales = hospitales;
          this.respaldoHospitales = hospitales;
      });
}


guardarCambios( hospital:Hospital ){

this.hospitalService.actualizarHospital( hospital._id!, hospital.nombre ).subscribe( resp =>{

      this.cargarHospitales();
      Swal.fire( 'Actualizado', hospital.nombre, 'success' );  
      this.modalImagenService.nuevaImagen.emit( hospital.img );
})
}


eliminarHospital( hospital:Hospital ){

  this.hospitalService.eliminarHospital( hospital._id! ).subscribe( resp =>{
  
        this.cargarHospitales();
        Swal.fire( 'Borrado', hospital.nombre, 'success' );  
  })
  }


async abrirSeetAlert(  ){

  const { value = '' } = await Swal.fire({
    title:'Crear hospital',
    text:'Ingrese el nombre del nuevo hospital',
    input: 'text',
    inputPlaceholder: 'Nombre del hospital',
    showCancelButton:true
  })


  
  if( value.length > 0 ){

    this.hospitalService.crearHospital( value ).subscribe( resp =>{

                // this.hospitales = [

                //   ...this.hospitales,
                //   resp.hospital
                // ];

                this.hospitales.push( resp.hospital );
               
    });
  }
  
}


abrirModal( hospital:Hospital ){

    this.modalImagenService.abrirModal( 'hospitales', hospital._id!, hospital.img );
    
    this.modalImagenService.nuevaImagen.subscribe( img => this.cargarHospitales() );
}


busquedas( busqueda:string  ){

  if( busqueda.length <= 0 ){
    
    this.hospitales = this.respaldoHospitales;
    return
  };

  this.busquedasService.busqueda( 'hospitales', busqueda ).subscribe( resp =>{
    
    this.hospitales = resp;
  } );

}




}
