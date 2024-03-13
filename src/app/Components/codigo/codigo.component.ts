import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
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

  constructor(private userService: UserService, private router: Router) {}

  onCodigo() {
    this.userService.verificarCodigo(this.codigoObj).subscribe((res: any) => {
        if (res.msg === 'Codigo correcto') {
          this.router.navigate(['/layout/estados']);
        } else {
          console.error('Error: No se pudo verificar el código.');
          alert("no se pudo verificar el codigo")
        }
      },
      (error) => {
        console.error('Error en la solicitud de verificación del código:', error);
        alert("error en la solicitud de verificacion")
      }
    );
  }
}

