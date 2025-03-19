import { Component, OnInit } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, PieController } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, PieController );

@Component({
  selector: 'app-pizza-chart',
  standalone: false,
  templateUrl: './pizza-chart.component.html',
  styleUrl: './pizza-chart.component.css'
})
export class PizzaChartComponent implements OnInit{

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById("myPieChart") as HTMLCanvasElement;

    if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data:{
        labels: ['Saídas', 'Entradas', 'Carteira' ],
        datasets:[{
        data: [10,20,30],
        backgroundColor:['#D10300', '#0034FF', '#009706'],
      }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'right',
            labels:{
                font :{
                size: 25,
                family: 'Arial',
                weight: 'bold',
            },
            color:  '#000'
            },
          },
        },
      }
    });
    console.log('Gráfico de Pizza criado com sucesso!');
  } else {
    console.error('Canvas com id não encontrado!');
  }
  }
}
