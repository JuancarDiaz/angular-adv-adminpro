import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{


  ngOnInit(): void {
    
    this.btnClass = `btn ${this.btnClass}`
  }


  @Input('valor') progreso:number=50;
  @Input('btnClass') btnClass:string='btn-primary';
  @Output('valorSalida') valorSalida:EventEmitter<number> = new EventEmitter<number>()

  // get getPorcentaje(){
  //   return `${ this.progreso }%`
  // }

  // set porcentaje( porcentaje:number ){

  //     if( porcentaje > 100 || porcentaje <0 ){  
      
  //           return  
  //     }else{

  //       this.progreso = porcentaje
  //     }
  // }

  cambiarValor( valor:number ){

    console.log('_>',valor);
    
    if( this.progreso >= 100 && valor >= 0 ){ 
    
      this.valorSalida.emit(100);
      this.progreso = 100
     }

    if( this.progreso <= 0 && valor <= 0 ){
      
      this.valorSalida.emit(0);
      this.progreso = 0 
    }

    this.valorSalida.emit(this.progreso);
    this.progreso = this.progreso + valor;   
  }


  onChange( muevoValor:number ){

console.log(muevoValor);


    if ( muevoValor >= 100 ){

      this.progreso = 100;

    }else if ( muevoValor <= 0 ){

      this.progreso = 0;
    }

    this.valorSalida.emit( this.progreso );
    
  }
  

}
