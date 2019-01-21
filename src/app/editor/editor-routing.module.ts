import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bonne-pratique',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver
    }
  },
  {
    path: 'sujet',
    component: EditorComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
