import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';


const routes:Routes=[

  // { path:'',
  //   loadChildren: ()=> import ( './pages/pages.module').then( m => m.PagesModule )
  // },
  // { path:'register',component:RegisterComponent},
  // { path:'login',component:LoginComponent},
  { path:'', redirectTo:'/dashboard',pathMatch:'full' },
  { path:'**',component:NopagefoundComponent },


]

@NgModule({
  imports: [ 
            RouterModule.forRoot( routes ),
            AuthModule,
            PagesModule
          ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
