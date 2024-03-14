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
import { DocentesComponent } from './Components/docentes/docentes.component';
import { TurnosComponent } from './Components/turnos/turnos.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { CodigoComponent } from './Components/codigo/codigo.component';
import { EstadoPostComponent } from './Components/estado-post/estado-post.component';
import { EstadoEditComponent } from './Components/estado-edit/estado-edit.component';
import { EscuelaPostComponent } from './Components/escuela-post/escuela-post.component';
import { EscuelaEditComponent } from './Components/escuela-edit/escuela-edit.component';
import { CarreraPostComponent } from './Components/carrera-post/carrera-post.component';
import { CarreraEditComponent } from './Components/carrera-edit/carrera-edit.component';
import { DocentePostComponent } from './Components/docente-post/docente-post.component';

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
    { path: 'codigo', component: CodigoComponent },
    {
        path: 'layout',
        component: LayoutComponent,
        children: [

            { path: 'alumnos', component: AlumnosComponent },
            { path: 'carreras', component: CarrerasComponent },
            { path: 'departamentos', component: DepartamentosComponent },
            { path: 'edificios', component: EdificiosComponent },
            { path: 'escuelas', component: EscuelasComponent, children:[
                { path: 'agregar', component: EscuelaPostComponent}
            ] },
            { path: 'estados', component: EstadosComponent, children:[
                
            ]},
            { path: 'grupos', component: GruposComponent },
            { path: 'materias', component: MateriasComponent },
            { path: 'profesores', component: ProfesoresComponent },
            { path: 'turnos', component: TurnosComponent },
        ]
    },
    { path: 'agregar', component: EstadoPostComponent },
    {path: 'editar/:id',component: EstadoEditComponent},
    { path: 'escuelas/agregar', component: EscuelaPostComponent},
    { path: 'escuelas/editar/:id', component: EscuelaEditComponent},
    { path: 'carreras/agregar', component: CarreraPostComponent },
    {path: 'carreras/editar/:id',component: CarreraEditComponent},
    
    { path: 'docentes/agregar', component: DocentePostComponent },
    {path: 'docentes/editar/:id',component: },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];
