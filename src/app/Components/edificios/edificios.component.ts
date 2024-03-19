import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

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
  rol : string = '';

  constructor(private http: HttpClient,private router: Router, private cookieService: CookieService) {
    this.edificioObj = new Edificio()
  }

  ngOnInit(): void {
    this.rol = this.cookieService.get('rol');
    this.obtenerEdificios();
  }

  obtenerEdificios() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getEdificios', { headers: headers2 }).subscribe((res: any) => {
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
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(confirm("¿Estás seguro de eliminar el edificio?")){
      this.http.delete('http://127.0.0.1:8000/api/auth/deleteEdificios/' + edificio.id, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Edificio eliminado") {
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
