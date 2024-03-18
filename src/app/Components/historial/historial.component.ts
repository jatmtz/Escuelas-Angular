import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: any[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://127.0.0.1:8000/api/auth/getHistorial', { headers: headers2 }).subscribe((res: any) => {
          this.historial = res.data;
        },
        error => {
          console.error('Error al cargar el historial:', error);
        }
      );
  }
}
