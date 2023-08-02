import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LoginForm } from 'src/app/interfaces/register.form';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
 styleUrls:['./login.component.css']
})
export class LoginComponent implements AfterViewInit {





  constructor( private router:Router,
               private fb:FormBuilder,
               private usuarioService:UsuarioService
             ) { }


@ViewChild('googleBtn') googleBtn!:ElementRef;

  ngAfterViewInit(): void {  this.googleInit(); }



  googleInit(){

    google.accounts.id.initialize({
                
      client_id: "865625731478-4abt4nha137dml7l0bsb57ag2rh0p6rh.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
    
        //document.getElementById("buttonDiv"),
        this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    
  }


  handleCredentialResponse( response:any ){

    console.log("Encoded JWT ID token: " + response.credential)
    this.usuarioService.loginGoogle( response.credential )
                       .subscribe( resp => {
                        
                        console.log('respLogin', resp);

                        this.router.navigate(['/'])
                      } )
  }




public loginForm = this.fb.group({

    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: [ '',  Validators.required ],
    remember:[ true ]
    
},{ } as AbstractControlOptions   

);





  login(){

    this.usuarioService.login( this.loginForm.value  as LoginForm  )
                       .subscribe({

                            next:((resp:any) => { 
                              
                              console.log('OK! ',resp)
                              
                                    if( this.loginForm.get('remember')?.value){
                                      
                                      localStorage.setItem('email',this.loginForm.get('email')?.value || '' )
                                      
                                    }else{

                                      localStorage.removeItem('email')
                                    }

                                    this.router.navigate(['/'])
                            }),
                            error:(({error}) => { 
                              
                              console.log(error);
                              Swal.fire('Error',error.msg,'error')
                            } ),
                            complete:()=>{ console.log('Completado correctamente ') }

                       });
                            

                   


    // this.router.navigate(['dashboard'])
  
  }

}
