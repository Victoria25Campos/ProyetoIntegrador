import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { MaterialModule } from '../material/material.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    TituloComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink
  ],
  exports:[
    NavBarComponent,
    TituloComponent
  ]
})
export class SharedModule { }
