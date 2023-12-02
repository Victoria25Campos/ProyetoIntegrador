import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { TableComponent } from './components/table/table.component';
import { DataTablesModule } from 'angular-datatables';
import { CreateComponent } from './pages/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpdateComponent } from './pages/update/update.component';


@NgModule({
  declarations: [
    ListadoComponent,
    TableComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    RouterLink
  ]
})
export class PlatoModule { }
