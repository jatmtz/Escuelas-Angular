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
import { GrupoPostComponent } from './Components/grupos-post/grupos-post.component';
import { GruposEditComponent } from './Components/grupos-edit/grupos-edit.component';
import { MateriaPostComponent } from './Components/materias-post/materias-post.component';
import { MateriaEditComponent } from './Components/materias-edit/materias-edit.component';
import { RolPostComponent } from './Components/rol-post/rol-post.component';
import { RolEditComponent } from './Components/roles-edit/roles-edit.component';
import { UsersComponent } from './Components/users/users.component';
import { RolesComponent } from './Components/roles/roles.component';
import { rolAdmin, rolUser, tokenauthGuard, verificaGuard } from './Guards/tokenauth.guard';
import { DepartamentoPostComponent } from './Components/departamento-post/departamento-post.component';
import { DepartamentoEditComponent } from './Components/departamento-edit/departamento-edit.component';
import { UserPostComponent } from './Components/user-post/user-post.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { LogsComponent } from './Components/logs/logs.component';
import { AlumnoPostComponent } from './Components/alumno-post/alumno-post.component';
import { AlumnoEditComponent } from './Components/alumno-edit/alumno-edit.component';

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

            { path: 'users', component:  UsersComponent},
            { path: 'roles', component: RolesComponent },
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
            { path: 'logs', component: LogsComponent },
        ],  canActivate: [tokenauthGuard, verificaGuard]
    },
    { path: 'agregar', component: EstadoPostComponent, canActivate: [tokenauthGuard, verificaGuard, rolUser]},
    {path: 'editar/:id',component: EstadoEditComponent, canActivate: [tokenauthGuard, verificaGuard, rolUser]},
    { path: 'escuelas/agregar', component: EscuelaPostComponent, canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    { path: 'escuelas/editar/:id', component: EscuelaEditComponent, canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},

    { path: 'alumnos/agregar', component: AlumnoPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    {path: 'alumnos/editar/:id',component: AlumnoEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    
    { path: 'carreras/agregar', component: CarreraPostComponent ,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    {path: 'carreras/editar/:id',component: CarreraEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},

    { path: 'users/agregar', component: UserPostComponent ,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    {path: 'users/editar/:id',component: UserEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},

    { path: 'departamentos/agregar', component: DepartamentoPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },
    {path: 'departamentos/editar/:id',component: DepartamentoEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    
    { path: 'docentes/agregar', component: DocentePostComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },
    {path: 'docentes/editar/:id',component: DocenteEditComponent ,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},

    { path: 'edificios/agregar', component: EdificioPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolUser] }, /*CATALOGO*/
    {path: 'edificios/editar/:id',component: EdificioEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolUser] },

    { path: 'turnos/agregar', component: turnoPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolUser] }, /*CATALOGO*/
    {path: 'turnos/editar/:id',component: turnoEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolUser] },

    { path: 'grupos/agregar', component: GrupoPostComponent ,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    {path: 'grupos/editar/:id',component: GruposEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },
    
    { path: 'materias/agregar', component: MateriaPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },
    {path: 'materias/editar/:id',component: MateriaEditComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },

    { path: 'roles/agregar', component: RolPostComponent,canActivate: [tokenauthGuard, verificaGuard, rolAdmin] },
    {path: 'roles/editar/:id',component: RolEditComponent ,canActivate: [tokenauthGuard, verificaGuard, rolAdmin]},
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }

];
