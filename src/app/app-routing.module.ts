import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detalhe',
    loadChildren: () => import('./pages/detalhe/detalhe.module').then( m => m.DetalhePageModule)
  },
  {
    path: 'solicitacoes',
    loadChildren: () => import('./pages/solicitacoes/solicitacoes.module').then( m => m.SolicitacoesPageModule)
  },
  {
    path: 'comprovante',
    loadChildren: () => import('./pages/comprovante/comprovante.module').then( m => m.ComprovantePageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./pages/historico/historico.module').then( m => m.HistoricoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }