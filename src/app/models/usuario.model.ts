import { environment } from "src/environments/environment";

 export class Usuario {


    constructor(


            public nombre: string,
            public email: string,
            public password?: string, 
            public img?: string,
            public google?: boolean,
            public role?: string,
            public uid?: string ) { }


get imagenURL(){

          if( this.img?.includes('https')) return this.img;
          
             
             if( this.img ){

                        return `${ environment.base_url }/uploads/usuarios/${ this.img }`
             }else{

                        return `${ environment.base_url }/uploads/usuarios/nodisponible.png`
             }
}

 } 