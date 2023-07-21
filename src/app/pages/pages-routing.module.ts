import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

  const routes:Routes = [
    {
       path:'dashboard',
       component: PagesComponent,
       children:[
          { path:'',component:DashboardComponent },
          { path:'grafica1',component:Grafica1Component },
          { path:'progress',component:ProgressComponent }, 
          { path:'account-settings',component:AccountSettingsComponent }, 
        
        ]    
  }
  ]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  
})
export class PagesRoutingModule { }
