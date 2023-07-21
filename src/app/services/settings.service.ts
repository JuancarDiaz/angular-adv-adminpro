import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {



  public linkTheme = document.querySelector('#theme');

  constructor(){

        const tema = localStorage.getItem('theme') || './assets/css/colors/default.css';

        this.linkTheme?.setAttribute('href', tema);
  }




  changeTheme(theme:string){

    const url = `./assets/css/colors/${ theme }.css`

    this.linkTheme?.setAttribute('href',url);

    localStorage.setItem( 'theme',url );

    this.checkCurrentTheme();
}



checkCurrentTheme(  ):void{

   const licks = document.querySelectorAll('.selector');
    

   licks!.forEach( ( elem ) => {

        elem.classList.remove('working');

        const btnTheme = elem.getAttribute('data-theme');

        const btnThemeURL = `./assets/css/colors/${ btnTheme }.css`

        const currentTheme = this.linkTheme?.getAttribute('href');

              if ( btnThemeURL === currentTheme ){

                elem.classList.add('working')
              }

  })
}


}
