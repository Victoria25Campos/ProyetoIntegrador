import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PlatoClienteComponent } from './pages/plato-cliente/plato-cliente.component';
import { PlatoDetalleComponent } from './pages/plato-detalle/plato-detalle.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

const routes: Routes = [
  {
    path: 'home-page',
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'plato', component: PlatoClienteComponent },
      { path: 'plato-detalle', component: PlatoDetalleComponent },
      { path: 'plato-detalle/:id', component: PlatoDetalleComponent },
      { path: 'carrito', component: CarritoComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'home' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
