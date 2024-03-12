import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registerObj: Register;

  constructor(private http: HttpClient, private router: Router) {
    this.registerObj = new Register()
  }

  onRegister(){
    this.http.post('http://127.0.0.1:8000/api/register', this.registerObj).subscribe((res:any)=>{
      if(res.result) {
        this.router.navigate(['/login']);
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }

}

export class Register {
  name: string;
  email: string;
  password: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}

