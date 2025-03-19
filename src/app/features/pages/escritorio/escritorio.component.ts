import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Interface para tipagem
interface Movimentacao {
  valor: number;
  descricao: string;
  tipoMovimentacao: string;
  data: string;
}

@Component({
  selector: 'app-escritorio',
  standalone: false,
  templateUrl: './escritorio.component.html',
  styleUrl: './escritorio.component.css'
})
export class EscritorioComponent implements OnInit {
  movimentacaoForm!: FormGroup;
  movimentacoes: Movimentacao[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.movimentacaoForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(0.01)]],
      descricao: ['', Validators.required],
      tipoMovimentacao: ['', Validators.required],
    });
    
    // Carrega as movimentações existentes
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes(): void {
    const dadosSalvos = localStorage.getItem('movimentacoes');
    
    if (dadosSalvos) {
      try {
        // Tenta fazer o parse e imprime para debug
        const dados = JSON.parse(dadosSalvos);
        console.log('Dados carregados:', dados);
        
        // Verifica se é um array
        if (Array.isArray(dados)) {
          this.movimentacoes = dados;
        } else {
          // Se não for um array, tenta converter
          this.movimentacoes = [dados];
          console.warn('Os dados não estavam em formato de array');
        }
      } catch (error) {
        console.error('Erro ao carregar movimentações:', error);
        this.movimentacoes = [];
      }
    } else {
      this.movimentacoes = [];
    }
    
    console.log('Movimentações após carregar:', this.movimentacoes);
  }

  salvarDados(): void {
    if (this.movimentacaoForm.valid) {
      // Cria nova movimentação com dados do formulário
      const novaMovimentacao: Movimentacao = {
        valor: this.movimentacaoForm.value.valor,
        descricao: this.movimentacaoForm.value.descricao,
        tipoMovimentacao: this.movimentacaoForm.value.tipoMovimentacao,
        data: new Date().toISOString()
      };
      
      console.log('Nova movimentação:', novaMovimentacao);
      
      // Carrega movimentações existentes
      this.carregarMovimentacoes();
      
      // Adiciona à lista local
      this.movimentacoes.push(novaMovimentacao);
      
      console.log('Lista após adicionar:', this.movimentacoes);
      
      // Salva no localStorage
      localStorage.setItem('movimentacoes', JSON.stringify(this.movimentacoes));
      console.log('Dados salvos no LocalStorage');

      this.movimentacaoForm.reset();
    } else {
      console.log('Formulário inválido!');
    }
  }

  onSubmit(): void {
    console.log('Formulário enviado!');
    
    if (this.movimentacaoForm?.valid) {
      console.log('Valores do formulário:', this.movimentacaoForm.value);
      this.salvarDados();
      alert('Movimentação adicionada!');
    } else {
      this.movimentacaoForm?.markAllAsTouched();
      alert('Por favor, preencha todos os campos obrigatórios!');
    }
  }

  limparCampos(): void {
    this.movimentacaoForm.reset();
    console.log('Campos limpos');
  }

  excluirMovimentacao(index: number): void {
    this.movimentacoes.splice(index, 1);
    localStorage.setItem('movimentacoes', JSON.stringify(this.movimentacoes));
    console.log('Movimentação excluída');
  }
  
  // Método para limpar todas as movimentações (para debug)
  limparTudo(): void {
    localStorage.removeItem('movimentacoes');
    this.movimentacoes = [];
    console.log('Todas as movimentações foram removidas');
  }
}