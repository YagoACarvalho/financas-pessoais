import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscritorioComponent } from './features/pages/escritorio/escritorio.component';
import { HouseComponent } from './features/pages/house/house.component';
import { HistoricoComponent } from './features/pages/historico/historico.component';
import { AnotacoesComponent } from './features/pages/anotacoes/anotacoes.component';

const routes: Routes = [
  { path: 'escritorio', component: EscritorioComponent},
  { path: '', component: HouseComponent},
  { path: 'historico', component: HistoricoComponent},
  { path: 'anotacoes', component: AnotacoesComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
