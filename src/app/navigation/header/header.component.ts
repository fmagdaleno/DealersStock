import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import {HomeService} from '../../services/home/home.service';
import { HttpEventType } from '@angular/common/http';
//mport { users } from '../../models/users/users.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() public sidenavToggle = new EventEmitter();

    constructor() { }

    //public UsuarioFirmado: users = new users;
    

    ngOnInit() {
            //this.getUsuarioFirmado();
    }

    //public onToggleSidenav = () => {
        //this.sidenavToggle.emit();
   // }

    /*getUsuarioFirmado(): void{
        this.dataApiService
        .getUsuarioFirmado()
        .subscribe((usuarioFirmado:users) => (this.UsuarioFirmado = usuarioFirmado));
      }*/

            ///////////////////////////DOWNLOAD FILE


}
