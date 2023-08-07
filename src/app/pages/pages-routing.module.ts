import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxJsComponent } from './rx-js/rx-js.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

  const routes:Routes = [
    {
       path:'dashboard',
       component: PagesComponent,
       canActivate:[ authGuard ],
       children:[
          { path:'',component:DashboardComponent, data:{ titulo:'Dashboard'} },
          { path:'grafica1',component:Grafica1Component, data:{ titulo:'Grafica1'}},
          { path:'progress',component:ProgressComponent, data:{ titulo:'Progress'}}, 
          { path:'account-settings',component:AccountSettingsComponent, data:{ titulo:'Account Settings'}}, 
          { path:'promesas',component:PromesasComponent, data:{ titulo:'Promesas'} }, 
          { path:'RxJs',component:RxJsComponent, data:{ titulo:'RxJs'} }, 
          { path:'perfil',component:PerfilComponent, data:{ titulo:'Perfil de usuario'} }, 
          
          // MANTENIMIENTOS:
          { path:'usuarios',component:UsuariosComponent, data:{ titulo:'Mantenimiento de usuarios'} }, 
          { path:'hospitales',component:HospitalesComponent, data:{ titulo:'Mantenimiento de hospitales'} }, 
          { path:'medicos',component:MedicosComponent, data:{ titulo:'Mantenimiento de medicos'} }, 
          { path:'medico/:id',component:MedicoComponent, data:{ titulo:'Mantenimiento de medico'} }, 

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
