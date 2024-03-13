import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isProcessing=false;
  loginObj: Login;


  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {
    this.loginObj = new Login();
  }

  login() : any {
    this.isProcessing = true;
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe((res: any) => {
      if (res.access_token) {
        this.cookieService.set('token', res.access_token);
        this.router.navigate(['/codigo']);
      } else {
        alert("error")
      }
    });
  }
}

export class Login{
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}
