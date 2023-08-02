import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy {


public titulo:string = '';
public tituloSubs$!:Subscription;

  constructor( private router:Router){
    
    this.tituloSubs$ = this.getArgumentosRuta().subscribe( ({titulo})=>{ 
        
      this.titulo = titulo
      document.title = this.titulo
    });
      
  }

  ngOnDestroy(): void { this.tituloSubs$.unsubscribe(); console.log('NOS DESUSBSRIBIMOS DE LAS RUTAS'); }




getArgumentosRuta():Observable<any>{

    return this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        filter((event: any) => event.snapshot.firstChild),
        map((event: any) => event.snapshot.firstChild.data)
      );
  }

}
