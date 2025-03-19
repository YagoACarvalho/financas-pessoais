import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './features/components/menu/menu.component';
import { HouseComponent } from './features/pages/house/house.component';
import { EscritorioComponent } from './features/pages/escritorio/escritorio.component';
import { HistoricoComponent } from './features/pages/historico/historico.component';
import { PizzaChartComponent } from './features/components/pizza-chart/pizza-chart.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnotacoesComponent } from './features/pages/anotacoes/anotacoes.component';



@NgModule({
  declarations: [
    AppComponent,
    HouseComponent,
    EscritorioComponent,
    HistoricoComponent,
    PizzaChartComponent,
    MenuComponent,
    AnotacoesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
