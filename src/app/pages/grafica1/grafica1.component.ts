import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {


  public datosGrafica1:[number,number,number] = [10,50,63];
  public labelsGrafica1:[string,string,string] = ['peras','melocotonicos','platanos'];
  
  
  public datosGrafica2:[number,number,number] = [85,23,5];
  public labelsGrafica2:[string,string,string] = ['bañadorico','praia','amor'];
  

  
  public datosGrafica3:[number,number,number] = [47,7,77];
  public labelsGrafica3:[string,string,string] = ['risas','uves','kueme'];
  

  
  public datosGrafica4:[number,number,number] = [100,10,92];
  public labelsGrafica4:[string,string,string] = ['porras','cafes','xoxos'];
  

}
