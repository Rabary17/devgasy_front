import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ListuserComponent } from './admin/listuser/listuser.component';
import { ListarticleComponent } from './admin/listarticle/listarticle.component';
import { EditorComponent } from './editor/editor.component';
import { AuthGuard } from '../app/core';
import { EditableArticleResolver } from './editor/editable-article-resolver.service';

const routes: Routes = [
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
