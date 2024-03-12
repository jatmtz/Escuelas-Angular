import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-codigo',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './codigo.component.html',
  styleUrl: './codigo.component.css'
})
export class CodigoComponent {

  codigoObj: Codigo;

  constructor(private http: HttpClient, private router: Router) {
    this.codigoObj = new Codigo()
  }

  onCodigo(){
    this.http.post('http://127.0.0.1:8000/api/auth/verificar', this.codigoObj).subscribe((res:any)=>{
      if(res.result) {
        this.router.navigate(['/layout/estados']);
      }
      else {
        //alert(res.message)
      }
    })
  }

}

export class Codigo {
  codigo: string;
  constructor() {
    this.codigo = '';
  }
}
