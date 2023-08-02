import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterForm } from 'src/app/interfaces/register.form';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css'],
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
 
  public formSubmitted = false; 

    
  ngOnInit(): void {}

  constructor( private fb:FormBuilder,
               private usuariosService:UsuarioService
             ){ }




  public registerForm = this.fb.group({

            nombre: [ 'juancarlos', [ Validators.required] ],
            email: [ 'juancardiazjuarez@gmail.com', [ Validators.required, Validators.email ] ],
            password: [ '123',  Validators.required ],
            password2: [ '123', Validators.required ],
            terminos: [ false ,  Validators.required ],
        },{
            
              validators: [this.passwordsIguales( 'password', 'password2' )]

          } as AbstractControlOptions   
    );






  crearUsuario(  ){

    this.formSubmitted = true;
    console.log( this.registerForm );
    this.aceptarTerminos();


    if( this.registerForm.valid ){

      console.log('FORMULARIO CORRECTO');

      this.usuariosService.crearUsuario( this.registerForm.value as RegisterForm)
                          .subscribe({ 

                                      next:(resp:any)=> { 

                                        console.log(' USUARIO CREADO CORRECTAMENTE');
                                        console.log( resp );
                                      },
                                      error:({error}) => { Swal.fire('Error',error.msg,'error') }
                                      ,
                                      complete:() => '---> ObservableCompletado <---'                                    
                                    });
      
    }else{

      console.log('FORMULARIO NO ES CORRECTO');
      return
    }

    console.log( this.registerForm.value );

   }







campoNoValido( campo:string ):boolean{

    if( this.registerForm.get( campo )?.invalid  && this.formSubmitted ){

        return true;
    }else{

      return false;
    }
}



contrasenasNoValidas(){       //NO NOS VALE ESTE METODO

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( !(pass1 === pass2) && this.formSubmitted ){

      return true;

    }else{

      return false;

    }
}




aceptarTerminos(){

  if(!this.registerForm.get('terminos')?.value && this.formSubmitted){

      this.registerForm.get('terminos')?.setErrors({ terminos:true});
      return true;
  }else{

    this.registerForm.get('terminos')?.setErrors( null );
    return false;
  }
}




passwordsIguales( pass1Name:string, pass2Name:string) {

  return ( formGroup:AbstractControl ):ValidationErrors|null =>{ 

          console.log('...accion...');

          const pass1Controll = formGroup.get( pass1Name );
          const pass2Controll = formGroup.get( pass2Name );
        
          if( pass1Controll?.value === pass2Controll?.value ){

            console.log( 'son iguales ');

            pass2Controll?.setErrors(null)
            return null;

          }else{

            pass2Controll?.setErrors( {noEsIgual: true} );
            return {noIguales: true}

          }
         
    }
}


   






}
