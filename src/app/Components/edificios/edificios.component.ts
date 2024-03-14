import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edificios',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './edificios.component.html',
  styleUrl: './edificios.component.css'
})
export class EdificiosComponent {
  edificioObj: Edificio;
  edificios: Edificio[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.edificioObj = new Edificio()
  }

  ngOnInit(): void {
    this.obtenerEdificios();
  }

  obtenerEdificios() {
    this.http.get('http://' + window.location.hostname + ':8000/api/getEdificios').subscribe((res: any) => {
      if (res.msg === "Edificios") {
        this.edificios = res.data;
      } else {
        console.log("Error al obtener las edificios:", res);
      }
    });
  }

  editarEdificio(edificio: any) {
    this.router.navigate(['/edificios/editar/', edificio.id]);
    console.log('Editar edificio:', edificio);
  }

  eliminarEdificio(edificio: Edificio) {
    if (confirm("¿Estás seguro de eliminar la edificio?")){
    this.http.delete('http://' + window.location.hostname + ':8000/api/deleteEdificios/' + edificio.id).subscribe((res: any) => {
      if (res.msg === "Edificio eliminada") {
        this.obtenerEdificios();
      } else {
        console.log("Error al eliminar la edificio:", res);
      }
    });
    console.log('Eliminar edificio:', edificio);
  }
}
}

export class Edificio {
  id : number;
  nombre: string;
  escuela_id: number;
  active: boolean;
  constructor(){
    this.id = 0;
    this.nombre = '';
    this.escuela_id = 0;
    this.active = false;
  }
}
