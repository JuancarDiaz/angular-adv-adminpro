import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { BreadcrumsComponent } from './shared/breadcrums/breadcrums.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
