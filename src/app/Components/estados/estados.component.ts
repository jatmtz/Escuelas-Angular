import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-estados',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './estados.component.html',
  styleUrl: './estados.component.css'
})
export class EstadosComponent implements OnInit{
  estados: any[] = [
    { id: 1, nombre: 'Estado 1' },
    { id: 2, nombre: 'Estado 2' },
    { id: 3, nombre: 'Estado 3' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  editarEstado(estado: any) {
    // Lógica para editar el estado
    console.log('Editar estado:', estado);
  }

  eliminarEstado(estado: any) {
    // Lógica para eliminar el estado
    console.log('Eliminar estado:', estado);
  }
}
