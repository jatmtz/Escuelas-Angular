import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class turnosComponent implements OnInit{
  turnoObj: turno;
  rol : string = '';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.turnoObj = new turno()
  }

  turnos: turno[] = [];

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
    this.obtenerturnos();
  }

  obtenerturnos() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getTurnos', { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Turnos") {
        this.turnos = res.data;
      } else {
        console.log("Error al obtener los turnos:", res);
      }
    });
  }

  editarturno(turno: turno) {
    this.router.navigate(['/turnos/editar/', turno.id]);
    console.log('Editar turno:', turno);
  }

  eliminarturno(turno: turno) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(confirm("¿Estás seguro de eliminar el turno?")){
      this.http.delete('http://127.0.0.1:8000/api/auth/deleteTurnos/' + turno.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Turno eliminado") {
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