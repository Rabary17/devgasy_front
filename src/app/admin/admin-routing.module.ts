import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminResolver } from './admin-resolver.service';

const routes: Routes = [ {
  path: '/',
  component: AdminComponent,
  resolve: {
    admin: AdminResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
