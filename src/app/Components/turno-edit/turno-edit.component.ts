import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-turno-edit',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIcon,RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './turno-edit.component.html',
  styleUrl: './turno-edit.component.css'
})
export class turnoEditComponent  implements OnInit{
  turno: any;
  turnoObj: turno;
  turnoForm: FormGroup;

  constructor( 
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
    const turnoId = this.route.snapshot.paramMap.get('id');
    this.obtenerturnoPorId(turnoId);
    this.turnoForm = this.formBuilder.group({
      turno: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZñÑ\s]+$/)
      ]]
    });
  }

  editarturno() {
    this.http.put('http://' + window.location.hostname + ':8000/api/putturnos/' + this.turno.id, this.turnoObj).subscribe((res: any) => {
      if (res.msg === "turno actualizado") {
        alert("turno actualizado");
        this.router.navigate(['/layout/turnos']);
      } else {
        console.log("Error al actualizar el turno:", res);
      }
    });
  }

  obtenerturnoPorId(turnoId: any) {
    this.http.get('http://' + window.location.hostname + ':8000/api/showturnos/' + turnoId).subscribe((res: any) => {
      if (res.msg === "turno") {
        this.turno = res.data;
        this.turnoObj.id = this.turno.id;
        this.turnoObj.turno = this.turno.turno;
        this.turnoObj.active = this.turno.active;
      } else {
        console.log("Error al obtener los detalles del turno:", res);
      }
    });
  }
}

export class turno {
  id: number;
  turno: string;
  active: boolean;

  constructor() {
    this.id = 0;
    this.turno = '';
    this.active = true;
  }
}
