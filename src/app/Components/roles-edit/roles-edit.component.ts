import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rol-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './roles-edit.component.html',
  styleUrl: './roles-edit.component.css'
})
export class RolEditComponent  implements OnInit{
  rol: any;
  rolObj: Rol;
  rolForm: FormGroup;

  constructor( 
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
    const rolId = this.route.snapshot.paramMap.get('id');
    this.obtenerRolPorId(rolId);
    this.rolForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }

  editarRol() {
    this.http.put('http://' + window.location.hostname + ':8000/api/putRoles/' + this.rol.id, this.rolObj).subscribe((res: any) => {
      if (res.msg === "Rol actualizado") {
        alert("Rol actualizado");
        this.router.navigate(['/layout/roles']);
      } else {
        console.log("Error al actualizar el rol:", res);
      }
    });
  }

  obtenerRolPorId(rolId: any) {
    this.http.get('http://' + window.location.hostname + ':8000/api/showRoles/' + rolId).subscribe((res: any) => {
      if (res.msg === "Rol") {
        this.rol = res.data;
        this.rolObj.id = this.rol.id;
        this.rolObj.name = this.rol.name;
        this.rolObj.active = this.rol.active;
      } else {
        console.log("Error al obtener los detalles del rol:", res);
      }
    });
  }
}

export class Rol {
  id: number;
  name: string;
  active: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.active = true;
  }
}
