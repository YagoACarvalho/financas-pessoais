import { Component, OnInit} from '@angular/core';

interface Movimentacao {
  valor: number;
  descricao: string;
  tipoMovimentacao: string;
  data: string;
  // Adicione quaisquer outros campos que você esteja usando
}

@Component({
  selector: 'app-historico',
  standalone: false,
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent implements OnInit {
  movimentacoes: Movimentacao[] = [];
  dadosLocalStorage: string = '';
  saldoTotal: number = 0;

  constructor() { }

  ngOnInit() {
    this.carregarMovimentacoes();
    this.saldoTotal = this.calcularSaldo();
  }
  
  carregarMovimentacoes() {
    // Altere 'movimentacoes' para a chave que você está usando no localStorage
    const dados = localStorage.getItem('movimentacoes');
    this.dadosLocalStorage = dados || 'Nenhum dado encontrado';

    if (dados) {
      try {
        const parsedData = JSON.parse(dados);
        console.log('Dados carregados:', parsedData);
        
        if (Array.isArray(parsedData)) {
          this.movimentacoes = parsedData;
        } else {
          console.error('Os dados não são um array:', parsedData);
          // Se for um objeto único, tente transformá-lo em array
          this.movimentacoes = [parsedData];
        }
        
        // Atualiza o saldo total sempre que carregar novos dados
        this.saldoTotal = this.calcularSaldo();
      } catch (error) {
        console.error('Erro ao analisar dados:', error);
      }
    }
  }

  formatarValor(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  calcularSaldo(): number {
    return this.movimentacoes.reduce((total, item) => {
      if (item.tipoMovimentacao === 'entrada') {
        return total + Number(item.valor);
      } else {
        return total - Number(item.valor);
      }
    }, 0);
  }
  
  recarregarDados() {
    this.carregarMovimentacoes();
  }

  excluirMovimentacao(index: number): void {
    this.movimentacoes.splice(index, 1);
    localStorage.setItem('movimentacoes', JSON.stringify(this.movimentacoes));
    console.log('Movimentação excluída');
    
    // Atualiza o saldo total após excluir uma movimentação
    this.saldoTotal = this.calcularSaldo();
  }
  
  // Método para limpar todas as movimentações (para debug)
  limparTudo(): void {
    localStorage.removeItem('movimentacoes');
    this.movimentacoes = [];
    console.log('Todas as movimentações foram removidas');
    
    // Reseta o saldo total
    this.saldoTotal = 0;
  }
}