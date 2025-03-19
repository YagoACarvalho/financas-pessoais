import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-anotacoes',
  standalone: false,
  templateUrl: './anotacoes.component.html',
  styleUrl: './anotacoes.component.css'
})
export class AnotacoesComponent {
  anotacao: string ='';
  anotacoes: string[] = [];

  constructor(){
    this.carregarAnotacoes();
  }

  salvarAnotacao(event: Event): void {
    event.preventDefault();
    if (this.anotacao.trim()) {
      this.anotacoes.push(this.anotacao);
      this.atualizarLocalStorage();
      this.anotacao = '';
      console.log('Anotação salva!')
    }
  }

  carregarAnotacoes() {
    const armazenadas = localStorage.getItem('anotacoes');
    this.anotacoes = armazenadas ? JSON.parse(armazenadas) : [];
  }

  removerAnotacao(index: number): void {
    this.anotacoes.splice(index, 1);
    this.atualizarLocalStorage();
  }

  atualizarLocalStorage() {
    localStorage.setItem('anotacoes', JSON.stringify(this.anotacoes));
  }
}