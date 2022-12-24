import { Component, OnInit, Output, EventEmitter,Inject } from '@angular/core';
//import {HomeService} from '../../services/home/home.service';
import { HttpEventType } from '@angular/common/http';
//mport { users } from '../../models/users/users.component';
import { MatCardModule } from '@angular/material/card';
import { FormControl, NgForm } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UnidadesService} from '../../services/unidades.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() public sidenavToggle = new EventEmitter();

    constructor(public dialog: MatDialog
                ,public unidadesServices: UnidadesService) { }

    strBusquedaGral = '';
    vinBus2 = '';
    ListUnidadesDialog: any[] = [];
    ListUnidades: any[] = [];
    strVIN:string = '';
    //public UsuarioFirmado: users = new users;
    

    ngOnInit() {

    }

    openDialogListadoVIN(form:NgForm){
        this.strBusquedaGral = form.value.formBusquedaGral;

        //setTimeout(() => {
          const dialogRefMasive = this.dialog.open(ListadoUnidadesDialogComponent, {
            width: '1000px',
            data:this.strBusquedaGral , 
          });
        //},500)
      }
}


////////////////////////MODALES
/////////////////////////////////////LISTADO UNIDADES
@Component({
    selector: 'app-listado-unidades-dialog',
    templateUrl: '../../listado-unidades-dialog/listado-unidades-dialog.component.html',
    styleUrls: ['../../listado-unidades-dialog/listado-unidades-dialog.component.css']
  })
  export class ListadoUnidadesDialogComponent implements OnInit {
  
    ListLocalidadesCombo: any[] = [];
    nuevaLocalidad: any;
    localidadRepetida: boolean = false;
    errorLocalidad: boolean = false;
    maxSize: boolean = false;
    ListUnidades:any[] = []
    strVIN: string = '';
  
    constructor(public unidadesServices: UnidadesService,
      public dialogRef: MatDialogRef<ListadoUnidadesDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog
    ) {
      this.getUnidades(this.data);
    } 
  
    ngOnInit(): void {
  
    }

    openDetalleVIN(strVIN:string){
      this.strVIN = strVIN;

      //setTimeout(() => {
        const dialogRefMasive = this.dialog.open(DetalleUnidadDialogComponent, {
          width: '1000px',
          data:this.strVIN , 
        });
      //},500)
    }

    getUnidades(strBusqueda:string): void{
      if(strBusqueda == undefined
        || strBusqueda == ''){
          strBusqueda = ' ';
        }
  
      this.unidadesServices
      .getAllUnidadesPoVIN(strBusqueda)
      .subscribe((_unidades:any[]) => { 
        this.ListUnidades = _unidades 
        });
    }
  
    maximizeDialog(){
      this.dialogRef.addPanelClass('full-screen-modal');
      this.dialogRef.updateSize('100vw','100vh');
      this.maxSize = true;
   
    }
  
    minimizeDialog(){
      this.dialogRef.updateSize('1000px');
      this.maxSize = false;
  
    }
  
    closeDialog(){
      this.dialogRef.close();
    }
  
  }

  /////////////////////////////////////DETALLE DE UNIDADES
  @Component({
    selector: 'app-detalle-unidad-dialog',
    templateUrl: '../../detalle-unidad-dialog/detalle-unidad-dialog.component.html',
    styleUrls: ['../../detalle-unidad-dialog/detalle-unidad-dialog.component.css']
  })
export class DetalleUnidadDialogComponent implements OnInit {

  nuevaLocalidad: any;
  localidadRepetida: boolean = false;
  errorLocalidad: boolean = false;
  maxSize: boolean = false;
  DetalleUnidad:any;

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<ListadoUnidadesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getDetalleUnidad(this.data);
  } 
  ngOnInit(): void {

  }

  getDetalleUnidad(strvin:string): void{
    if(strvin == undefined
      || strvin == ''){
        strvin = ' ';
      }
    this.unidadesServices
    .getDetalleVIN(strvin)
    .subscribe((_unidad:any) => { 
      this.DetalleUnidad = _unidad
      });
  }

  maximizeDialog(){
    this.dialogRef.addPanelClass('full-screen-modal');
    this.dialogRef.updateSize('100vw','100vh');
    this.maxSize = true;
 
  }

  minimizeDialog(){
    this.dialogRef.updateSize('1000px');
    this.maxSize = false;

  }

  closeDialog(){
    this.dialogRef.close();
  }

}