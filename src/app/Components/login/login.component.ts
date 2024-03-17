import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isProcessing=false;
  loginObj: Login;
  loginForm: FormGroup;


  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private formBuilder: FormBuilder) {
    this.loginObj = new Login();
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    });
  }

  login() : any {
    if (this.loginForm.invalid) {
      return;
    }
    this.http.post('http://127.0.0.1:8000/api/auth/login', this.loginObj).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('token', res.access_token);
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
