import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class turnosComponent implements OnInit{
  turnoObj: turno;

  constructor(private http: HttpClient,private router: Router) {
    this.turnoObj = new turno()
  }

  turnos: turno[] = [];

  ngOnInit(): void {
    this.obtenerturnos();
  }

  obtenerturnos() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getTurnos').subscribe((res: any) => {
      if (res.msg === "turnos") {
        this.turnos = res.data;
      } else {
        console.log("Error al obtener los turnos:", res);
      }
    });
  }

  editarturno(turno: turno) {
    this.router.navigate(['/editar/', turno.id]);
    console.log('Editar turno:', turno);
  }

  eliminarturno(turno: turno) {
    if(confirm("¿Estás seguro de eliminar el turno?")){
      this.http.delete('http://' + window.location.hostname + ':8000/api/deleteTurnos/' + turno.id).subscribe((res: any) => {
      if (res.msg === "turno eliminado") {
        this.obtenerturnos();
      } else {
        console.log("Error al eliminar el turno:", res);
      }
    });
    console.log('Eliminar turno:', turno);
    }
  }

}

export class turno {
  id: number;
  turno: string;
  active: boolean;
  constructor() {
    this.id = 0;
    this.turno = '';
    this.active = true;
  }
}