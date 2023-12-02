import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PlatoClienteComponent } from './pages/plato-cliente/plato-cliente.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PlatoDetalleComponent } from './pages/plato-detalle/plato-detalle.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    HomePageComponent,
    NavBarComponent,
    PlatoClienteComponent,
    CarritoComponent,
    PlatoDetalleComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    FormsModule,
    NgxPaginationModule,
    DataTablesModule
  ]
})
export class HomePageModule { }
