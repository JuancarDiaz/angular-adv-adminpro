import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule
  ],
  exports:[
    IncrementadorComponent,
    DonutComponent
  ]
})
export class ComponentsModule { }
