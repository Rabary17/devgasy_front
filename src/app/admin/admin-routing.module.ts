import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListuserComponent } from './listuser/listuser.component';
import { ListarticleComponent } from './listarticle/listarticle.component';
import { TransactionsComponent } from './transactions/transactions.component';

const adminRoutes: Routes = [
    {
      path: '',
      component: AdminComponent,
      children: [
        {
          path: '',
          redirectTo: '/user',
          pathMatch: 'full'
        },
        {
          path: 'user',
          component: ListuserComponent,
          resolve: {}
        },
        {
          path: 'articles',
          component: ListarticleComponent,
          resolve: {}
        },
        {
          path: 'transactions',
          component: TransactionsComponent,
          resolve: {}
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule,
    ]
  })
  export class AdminRoutingModule {}
  export const AdminComponents = [
    ListuserComponent,
    ListarticleComponent,
    AdminComponent
];
