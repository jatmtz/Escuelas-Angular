import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": '',
    "password": ''
  };

  constructor(private router: Router, private userService: UserService) {}

  login() {
    this.userService.Onlogin(this.loginObj).subscribe((res: any) => {
      if (res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/codigo']);
      } else {
        alert("error")
      }
    });
  }
}
