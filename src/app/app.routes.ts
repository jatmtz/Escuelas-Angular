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
import { turnosComponent } from './Components/turnos/turnos.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { CodigoComponent } from './Components/codigo/codigo.component';
import { EstadoPostComponent } from './Components/estado-post/estado-post.component';
import { EstadoEditComponent } from './Components/estado-edit/estado-edit.component';
import { EscuelaPostComponent } from './Components/escuela-post/escuela-post.component';
import { EscuelaEditComponent } from './Components/escuela-edit/escuela-edit.component';
import { CarreraPostComponent } from './Components/carrera-post/carrera-post.component';
import { CarreraEditComponent } from './Components/carrera-edit/carrera-edit.component';
import { DocentePostComponent } from './Components/docente-post/docente-post.component';
import { DocenteEditComponent } from './Components/docente-edit/docente-edit.component';
import { EdificioPostComponent } from './Components/edificio-post/edificio-post.component';
import { EdificioEditComponent } from './Components/edificio-edit/edificio-edit.component';
import { turnoPostComponent } from './Components/turno-post/turno-post.component';
import { turnoEditComponent } from './Components/turno-edit/turno-edit.component';

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
            { path: 'profesores', component: DocentesComponent },
            { path: 'turnos', component: turnosComponent },
        ]
    },
    { path: 'agregar', component: EstadoPostComponent },
    {path: 'editar/:id',component: EstadoEditComponent},
    { path: 'escuelas/agregar', component: EscuelaPostComponent},
    { path: 'escuelas/editar/:id', component: EscuelaEditComponent},
    { path: 'carreras/agregar', component: CarreraPostComponent },
    {path: 'carreras/editar/:id',component: CarreraEditComponent},
    
    { path: 'docentes/agregar', component: DocentePostComponent },
    {path: 'docentes/editar/:id',component: DocenteEditComponent },

    { path: 'edificios/agregar', component: EdificioPostComponent },
    {path: 'edificios/editar/:id',component: EdificioEditComponent },

    { path: 'turnos/agregar', component: turnoPostComponent },
    {path: 'turnos/editar/:id',component: turnoEditComponent },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];
