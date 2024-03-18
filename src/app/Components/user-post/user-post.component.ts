import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.css'
})
export class UserPostComponent {
  userObj: User;
  userForm: FormGroup;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) {
    this.userForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
    this.userObj = new User();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }
  

  agregarUser() {
    if (this.userForm.invalid) {
      return;
    }
    const token = this.cookieService.get('token');
    const hederss = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/postUsers', this.userObj, { headers: hederss }).subscribe(
      (res: any) => {
        if (res.msg === "User creado") {
          alert("User creado");
          this.router.navigate(['layout/users']);
        } else {
          alert("Error al crear el user");
          console.log("Error al crear el user:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
}

export class User {
  name: string;
  email: string;
  password: string;
  rol_id: string;
  constructor() {
    this.name = '';
    this.email = '';
    this.password  = '';
    this.rol_id = '';
   }
}
