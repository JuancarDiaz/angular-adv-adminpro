import { Component, OnInit } from '@angular/core';
declare function customInitFunction():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  ngOnInit(): void {

    customInitFunction();
  }

}


