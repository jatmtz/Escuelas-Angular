import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent  implements OnInit{
  user: any;
  userObj: User;
  userForm: FormGroup;

  constructor( 
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
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
      ]],
      rol_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
    this.userObj = new User();
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.obtenerUserPorId(userId);
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
      ]],
      rol_id: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(/^[0-9]+$/)
      ]]
    });
  }

  editarUser() {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put('http://127.0.0.1:8000/api/auth/put/' + this.user.id, this.userObj, { headers: headers2 } ).subscribe((res: any) => {
      if (res.msg === "Usuario actualizado") {
        alert("User actualizado");
        this.router.navigate(['/layout/users']);
      } else {
        console.log("Error al actualizar el user:", res);
      }
    });
  }

  obtenerUserPorId(userId: any) {
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://' + window.location.hostname + ':8000/api/auth/show/' + userId, { headers: headers2 }).subscribe((res: any) => {
      if (res.msg === "Usuario") {
        this.user = res.data;
        this.userObj.id = this.user.id;
        this.userObj.name = this.user.name;
        this.userObj.email = this.user.email;
        this.userObj.password = this.user.password;
        this.userObj.rol_id = this.user.rol_id;
        
      } else {
        console.log("Error al obtener los detalles del user:", res);
      }
    });
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  rol_id: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.rol_id = 2;
  }
}
