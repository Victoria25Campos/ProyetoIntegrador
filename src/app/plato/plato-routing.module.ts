import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  {
    path: 'plato',
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'listado', component: ListadoComponent },
      { path: 'update/:id', component: UpdateComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'create', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'create' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatoRoutingModule { }
