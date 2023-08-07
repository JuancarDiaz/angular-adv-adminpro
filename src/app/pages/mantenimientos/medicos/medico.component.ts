import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, of } from 'rxjs';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit{

  public medicoForm!:FormGroup;
  public hospitales:Hospital[]=[];
  public hospitalSeleccionado!:Hospital;
  public medicoSeleccionado!:Medico;
  public id:string='';
  public accion:string='nuevo';

  constructor( private fb:FormBuilder,
               private hospitalService:HospitalService,
               private medicoService:MedicoService,
               private router:Router,
               private activatedRoute:ActivatedRoute ){

   this.medicoForm = this.fb.group({

      nombre:['juancarlos',[ Validators.required]],
      hospital:['2',[ Validators.required]],
    })
  }


  ngOnInit(): void { 


    this.activatedRoute.params.subscribe( ({id}) => {
    

      console.log( 'id',id )

      if( id !== 'nuevo' ){

        this.accion = 'Actualización';
      }else{

        this.accion = 'Creación';
      }

      this.id = id

     } );



    this.cargarMedicos();



    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId =>{

          this.hospitalSeleccionado = this.hospitales.find( hosp => hosp._id === hospitalId )!;
    });


    this.cargarMedico( this.id );



   }




   cargarMedico( id:string ){



    if( id === 'nuevo' ) return;



       this.medicoService.obtenerMedicoById( this.id ).pipe( delay(100),catchError( medico => of(null))  ).subscribe( (medico:any) =>{


        console.log('mi medico es: ', medico);

            if( !medico ) {

              console.log('no hay medicos');
              
              this.router.navigate([`/dashboard/medicos`])
              return;
            }

            console.log('si hayyyy  medicos');
             const { nombre, hospital:{ _id } } = medico;            

            console.log(nombre, _id);
            

            this.medicoSeleccionado = medico;

            this.medicoForm.setValue({nombre, hospital: _id  } );
       });
   }



  guardarMedico(){

    const {nombre, hospital } = this.medicoForm.value;

    if( this.medicoSeleccionado ){

      // Actualizar

      console.log('editar')

      const data = { 

            ...this.medicoForm.value,
            _id: this.medicoSeleccionado._id
       } 

       console.log( 'data====cambio?==>',data)

      this.medicoService.actualizarMedico( data ).subscribe( resp => {

           console.log( '---respCrearMedico---->',resp )

            Swal.fire('Actualizado',`${ nombre } Acttualizado correctamente`, 'success');
                
      });


    }else{

      console.log('crear')


                this.medicoService.crearMedico( this.medicoForm.value ).subscribe( resp  => {
            
                      Swal.fire('Creado',`${ nombre } creado correctamente`, 'success');
            
                      this.router.navigate([`/dashboard/medico/${ resp.savedMedico._id }`])
                })
    }


  }

  cargarMedicos(){

    this.hospitalService.cargarHospitales().subscribe( hospitales => {

            this.hospitales = hospitales;
    });
  }

}
