import { Component, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscriber, Subscription, catchError, filter, interval, map, of, retry, take } from 'rxjs';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styles: [
  ]
})
export class RxJsComponent implements OnDestroy{

  public SubscriptionInterval!:Subscription;

  public observer:Observer<any> ={
    
      next:     ( next:number|string) =>console.log( 'next',next),
      error:    ( error:string ) => console.log(error),
      complete: () => console.log('---> OBSERVABLE COMPLETADO <--- ')
  }


    constructor(){



  //   const subscription:Subscription = this.retrornaObservable().pipe(

  //                                        // retry( 2 ), retryWhen( condicion .... ) --> más eficiente
                                          
  //                                        catchError( (error:number|string) =>{

                                              
  //                                             console.log('error ~~~~~~~~>',error); 
  //                                             return of('ERROR')
  //                                             })
  //                                              ).subscribe( this.observer );





this.SubscriptionInterval = this.retornaInterval().subscribe( this.observer )



}

ngOnDestroy(): void { this.SubscriptionInterval.unsubscribe() }


retornaInterval():Observable<number>{

  const intervalo$ = interval(500).pipe( 
    
    map(  (valor:number) => valor+1 ),
    take( 10 ),
    filter( valor => valor % 2 === 0)

   );
  return intervalo$;
}










   retrornaObservable():Observable<number|string>{

    let i:number = -1;

   return new Observable<number>( (subscriber:Subscriber<number>)=>{


            setInterval( ()=>{

                i++;

                subscriber.next( i );

                if( i === 4 ){ 

                  subscriber.complete(  );
                }

                if( i === 2 ){

                  console.log('i = 2 ...error');
                  

                  subscriber.error('ERROR SUBSCRIBER.ERROR()');//---------> NOTIFICA EL ERROR INMEDIATAMENTE SALE DEL FLUJO Y ENTRA EN EL OBSERVER(error:Error) => ...
                                                                          // Y AUTOMATICAMENTE COMPLETA EL OBSERVABLE ---> RECOMENDADO 100 X 100

                 // throw new Error('THROW NEW ERROR');// ---------> INTERRUMPE EL FLUJO DE EJECUCION DEL INTERIOR DEL OBSERVABLE ESTA INSTRUCCION NO PASARÁ NUNCA POR EL 
                                                                  // OBSERVER (error:Error) => ... Y NO NOTIFICARÍA A NINGUNA SUBSCRIPCION DEL ERROR
                }

            } , 1000 );

          

    });

   }

}
