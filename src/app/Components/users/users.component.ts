import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userObj: User;
  users: User[] = [];

  constructor(private http: HttpClient,private router: Router) {
    this.userObj = new User()
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://' + window.location.hostname + ':8000/api/get').subscribe((res: any) => {
      if (res.msg === "Usuarios") {
        this.users = res.data;
      } else {
        console.log("Error al obtener los usuarios:", res);
      }
    });
  }

  editUser(user: any) {
    this.router.navigate(['/users/editar/', user.id]);
    console.log('Editar usuario:', user);
  }

  deleteUser(user: User) {
    if (confirm("¿Estás seguro de eliminar el usuario?")){
      this.http.delete('http://' + window.location.hostname + ':8000/api/delete/' + user.id).subscribe((res: any) => {
        if (res.msg === "Usuario eliminado") {
          this.getUsers();
        } else {
          console.log("Error al eliminar el usuario:", res);
        }
      });
      console.log('Eliminar usuario:', user);
    }
  }
}

export class User {
  id : number;
  name: string;
  email: string;
  rol_id: number;
  estado: boolean;
  verificado: boolean;
  constructor(){
    this.id = 0;
    this.name = '';
    this.email = '';
    this.rol_id = 0;
    this.estado = false;
    this.verificado = false;
  }
}
