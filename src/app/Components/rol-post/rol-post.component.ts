import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rol-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './rol-post.component.html',
  styleUrl: './rol-post.component.css'
})
export class RolPostComponent {
  rolObj: Rol;
  rolForm: FormGroup;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.rolForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
    this.rolObj = new Rol();
  }

  ngOnInit(): void {
    this.rolForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }
  

  agregarRol() {
    if (this.rolForm.invalid) {
      return;
    }
    this.http.post('http://' + window.location.hostname + ':8000/api/postRoles', this.rolObj).subscribe(
      (res: any) => {
        if (res.msg === "Rol creado") {
          alert("Rol creado");
          this.router.navigate(['layout/roles']);
        } else {
          alert("Error al crear el rol");
          console.log("Error al crear el rol:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
}

export class Rol {
  name: string;
  constructor() {
    this.name = '';
  }
}
