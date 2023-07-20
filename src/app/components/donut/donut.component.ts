import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

  @Input('titulo') titulo:string='Sin Titulo';
  @Input('datos') datos:[number,number,number]=[0, 0, 0];
  @Input('labels') labels:[string,string,string]=['dato1', 'dato2', 'dato3'];


  data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const customColors = ['#FF5733', '#36A2EB', '#FFC300'];

        this.data = {
            labels: this.labels,
            datasets: [
                {
                    data:this.datos,//data: [300, 50, 100],
                    backgroundColor: customColors,
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
    }
}
