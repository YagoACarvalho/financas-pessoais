import { Component } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, Title, CategoryScale, PieController } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend, Title, CategoryScale, PieController );

@Component({
  selector: 'app-house',
  standalone: false,
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {}
  
