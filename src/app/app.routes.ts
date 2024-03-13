import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { AlumnosComponent } from './Components/alumnos/alumnos.component';
import { CarrerasComponent } from './Components/carreras/carreras.component';
import { DepartamentosComponent } from './Components/departamentos/departamentos.component';
import { EdificiosComponent } from './Components/edificios/edificios.component';
import { EscuelasComponent } from './Components/escuelas/escuelas.component';
import { EstadosComponent } from './Components/estados/estados.component';
import { GruposComponent } from './Components/grupos/grupos.component';
import { MateriasComponent } from './Components/materias/materias.component';
import { ProfesoresComponent } from './Components/profesores/profesores.component';
import { TurnosComponent } from './Components/turnos/turnos.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { CodigoComponent } from './Components/codigo/codigo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: 'registro', component: RegistroComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'codigo', component: CodigoComponent },
            { path: 'alumnos', component: AlumnosComponent },
            { path: 'carreras', component: CarrerasComponent },
            { path: 'departamentos', component: DepartamentosComponent },
            { path: 'edificios', component: EdificiosComponent },
            { path: 'escuelas', component: EscuelasComponent },
            { path: 'estados', component: EstadosComponent },
            { path: 'grupos', component: GruposComponent },
            { path: 'materias', component: MateriasComponent },
            { path: 'profesores', component: ProfesoresComponent },
            { path: 'turnos', component: TurnosComponent },
        ]
    },

];
