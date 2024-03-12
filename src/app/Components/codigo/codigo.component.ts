import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent {
  codigoObj: Codigo = new Codigo();

  constructor(private http: HttpClient, private router: Router) {}

  onCodigo() {
    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No se ha encontrado el token de acceso.');
      alert("No se encontro el token de acceso")
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
      return;
    }

    // Configurar los encabezados con el token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Enviar el token JWT al servidor para la verificación
    this.http.post<any>('http://127.0.0.1:8000/api/auth/verificar', this.codigoObj, { headers }).subscribe(
      (res: any) => {
        // Manejar la respuesta del servidor
        if (res.result) {
          // Acción en caso de éxito
          this.router.navigate(['/layout/estados']);
        } else {
          // Acción en caso de error
          console.error('Error: No se pudo verificar el token.');
          alert("No se pudo verificar el token")
        }
      },
      (error) => {
        // Manejar errores de la solicitud
        console.error('Error en la solicitud de verificación:', error);
        alert("error en la solicitud de verificacion")
      }
    );
  }
}

export class Codigo {
  codigo: string = '';
}
