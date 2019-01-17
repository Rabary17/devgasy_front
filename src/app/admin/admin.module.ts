import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { ListuserComponent } from './listuser/listuser.component';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { ListarticleComponent } from './listarticle/listarticle.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    ListuserComponent,
    AdminMenuComponent,
    ListarticleComponent,
    TransactionsComponent
  ]
})
export class AdminModule { }
