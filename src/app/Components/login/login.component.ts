import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login()
  }

  onLogin(){
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe((res:any)=>{
      if(res.result) {
        localStorage.setItem('angular17token', res.data.token)
        this.router.navigate(['/codigo']);
      }
      else {
        localStorage.setItem('angular17token', res.data.token)
        this.router.navigate(['/codigo']);
      }
    })
  }

}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
