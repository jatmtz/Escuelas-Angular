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

  
  constructor(private observer: BreakpointObserver){

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

}
