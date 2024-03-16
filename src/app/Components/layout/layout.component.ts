import { Component, OnInit, ViewChild } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {BreakpointObserver} from '@angular/cdk/layout'
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatButtonModule, MatDividerModule, MatIconModule, MatListModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav, {static: true})
  sideNav!: MatSidenav;

  estados:any[]=[];
  constructor(private observer: BreakpointObserver, private http:HttpClient, 
    private authService: AuthService, private router: Router, private cookieService: CookieService){

  }

  ngOnInit(): void{
    this.observer.observe(["(max-width: 1000px"])
    .subscribe((res) =>{
      if(res.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }
      else{
        this.sideNav.mode="side";
        this.sideNav.open()
      }
    })
  }

  logout(){
    const token = this.cookieService.get('token');
    const headers2 = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/auth/logout', {}, {headers: headers2}).subscribe((res:any) => {
      console.log(res);
    }, error=>{
      alert("Error API")
    })
    this.authService.isLogout();
    this.router.navigate(['/login']);
  }

  getEstados(){
    debugger;
    this.http.get('http://127.0.0.1:8000/api/auth/getEstados').subscribe((res:any) => {
      this.estados = res.data;
    }, error=>{
      alert("Error API")
    })
  }

}
