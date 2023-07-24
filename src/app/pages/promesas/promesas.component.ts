import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {


  constructor(){}


  ngOnInit(): void {
  
    // const promesa = new Promise( ( resolve,reject)=>{

    //   if( false ){

    //      resolve('holamundo')

    //     }else{

    //       reject('errorico')
    //     }


    // });

    // promesa.then(  (datos) => console.log(datos) )
    //        .catch( (error) => console.log(error) )

    // console.log('fin init')

    this.getUsuarios().then(  console.log  )

  }



  getUsuarios(  ){


  // return new Promise( (resolve,reject)=>{

     
 return fetch( `https://reqres.in/api/users` ).then( ( data ) => data.json() )
                                                    .then( ({data}) => data// resolve(data)
                                                    )
   // });

                                                    
  }

}
