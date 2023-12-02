import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    children: [
      { path: 'login', component: LoginComponent },

      // Otras rutas si es necesario
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Ruta por defecto
      { path: '**', redirectTo: 'login' } // Ruta genérica
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
