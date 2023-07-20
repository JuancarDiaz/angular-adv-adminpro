import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls:['./progress.component.css'],
  styles: [
  ]
})
export class ProgressComponent {

  public progreso1:number=25;
  public progreso2:number=55;
  
  get getProgreso1(){
    return `${ this.progreso1 }%`
  }

  get getProgreso2(){
    return `${ this.progreso2 }%`
  }


// cambioValorHijo( evento:number ){

//   this.progreso1 = evento;
//   console.log('hey',evento);
  
// }

}
