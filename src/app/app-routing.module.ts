import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatoRoutingModule } from './plato/plato-routing.module';
import { HomePageRoutingModule } from './home-page/home-page-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

const routes: Routes = [{
  path: 'plato',
  loadChildren: () => import('./plato/plato.module').then(modulo => modulo.PlatoModule)
},
{
  path: 'home-page',
  loadChildren: () => import('./home-page/home-page.module').then(modulo => modulo.HomePageModule)
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(modulo => modulo.LoginModule)
},
{
  path: '', // Ruta por defecto, cargar componente o página de inicio si es necesario
  pathMatch: 'full', // Asegura que solo coincida con la ruta vacía
  redirectTo: 'home-page' // Redirigir a 'byName' por defecto
},
{
  path: '**',
  redirectTo: 'home-page' // Redirigir rutas desconocidas a 'byName'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PlatoRoutingModule,
  HomePageRoutingModule,
  LoginRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
