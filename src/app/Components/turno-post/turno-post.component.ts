import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-turno-post',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './turno-post.component.html',
  styleUrl: './turno-post.component.css'
})
export class turnoPostComponent {
  turnoObj: turno;
  turnoForm: FormGroup;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.turnoForm = this.formBuilder.group({
      turno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
    this.turnoObj = new turno();
  }

  ngOnInit(): void {
    this.turnoForm = this.formBuilder.group({
      turno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }
  

  agregarturno() {
    if (this.turnoForm.invalid) {
      return;
    }
    this.http.post('http://' + window.location.hostname + ':8000/api/postturnos', this.turnoObj).subscribe(
      (res: any) => {
        if (res.msg === "turno creado") {
          alert("turno creado");
          this.router.navigate(['layout/turnos']);
        } else {
          alert("Error al crear el turno");
          console.log("Error al crear el turno:", res);
        }
      },
      (error) => {
        console.error("Error en la solicitud HTTP:", error);
      }
    );
  }
}

export class turno {
  turno: string;
  constructor() {
    this.turno = '';
  }
}
