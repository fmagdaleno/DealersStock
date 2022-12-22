import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from "@angular/common/http"
import {MatIconModule} from '@angular/material/icon';
//import {SeguridadService} from '../../services/seguridad/seguridad.service';
//import {UserRoles} from '../../models/usuarios/usuarios.component';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();
    usuariosRoles:any;

    //constructor(private seguridadService:SeguridadService) { }
    constructor() { }

    

    ngOnInit() {
        this.getListFuncionalidadRol();
 
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

    getListFuncionalidadRol(): void{
        //this.seguridadService
        //.GetUserProfile()
        //.subscribe((_UserRoles:any)  => {this.usuariosRoles = _UserRoles}) ;
      }

     

}
