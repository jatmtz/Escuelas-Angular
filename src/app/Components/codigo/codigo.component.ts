import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.css']
})
export class CodigoComponent {
  codigoObj: string = '';

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  onCodigo() {
    if (!this.authService.isLoggedIn()) {
      console.error('No se ha encontrado el token de acceso.');
      alert('Por favor, inicie sesión primero.');
      this.router.navigate(['/login']);
      return;
    }

    this.userService.verificarCodigo(this.codigoObj).subscribe(
      (res: any) => {
        if (res.msg === 'Codigo correcto') {
          this.router.navigate(['/layout/estados']);
        } else {
          console.error('Error: No se pudo verificar el código.');
          alert('No se pudo verificar el código.');
        }
      },
      (error) => {
        console.error('Error en la solicitud de verificación del código:', error);
        alert('Error en la solicitud de verificación del código.');
      }
    );
  }
}
