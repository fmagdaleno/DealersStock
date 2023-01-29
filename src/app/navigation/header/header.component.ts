import { Component, OnInit, Output, EventEmitter,Inject, ViewChild,ElementRef  } from '@angular/core';
//import {HomeService} from '../../services/home/home.service';
import { HttpEventType } from '@angular/common/http';
//mport { users } from '../../models/users/users.component';
import { MatCardModule } from '@angular/material/card';
import { FormControl, NgForm } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UnidadesService} from '../../services/unidades.service';
import { UnidadesComponent,MasiveTrasladosComponent, TransferenciasComponent,TrasladosDialogComponent,PublicarRedComponent } from '../../unidades/unidades.component';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx'; 
import {MatSidenav} from '@angular/material/sidenav';

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
    minimoRequerido = true;
    //public UsuarioFirmado: users = new users;
    

    ngOnInit() {

    }

    public onToggleSidenav = () => {
      this.sidenavToggle.emit();
  } 

    openDialogListadoVIN(form:NgForm){
        this.strBusquedaGral = form.value.formBusquedaGral;
        this.minimoRequerido = true; 

        if(this.strBusquedaGral.length >5){
        //setTimeout(() => {
          const dialogRefMasive = this.dialog.open(ListadoUnidadesDialogComponent, {
            width: '1000px',
            data:this.strBusquedaGral , 
          });
        //},500)
        }
        else{
          this.minimoRequerido = false;         
        }
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
    @ViewChild('tableUnit', { static: false })
  tableUnit!: ElementRef; 
    ListLocalidadesCombo: any[] = [];
    nuevaLocalidad: any;
    localidadRepetida: boolean = false;
    errorLocalidad: boolean = false;
    maxSize: boolean = false;
    ListUnidades:any[] = [];
    ListUnidadesDialog: any[] = [];
    strVIN: string = '';

      //UNIDADES POR VIN
  page_sizeUni: number = 10;
  page_numberUni: number = 1;
  
    constructor(public unidadesServices: UnidadesService,
      public dialogRef: MatDialogRef<ListadoUnidadesDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog
    ) {
      this.getUnidades(this.data);
    } 
  
    ngOnInit(): void {
  
    }

    valueChange( unidades:any, event:any) {
      //set the two-way binding here for the specific unit with the event
      unidades.bitChecked = event.checked;
      //this.dataApiInstalationRequest.selectedInstalationRequest = Object.assign({},Request);
  
  }

  handlePageUnidadesVIN(e: PageEvent){
    //this.page_sizeUni = e.pageSize;
    this.page_numberUni = e.pageIndex + 1;
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

    ExportTOExcelUnidades() {  
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableUnit.nativeElement);  
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Inventario');  
      XLSX.writeFile(wb, 'Inventario.xlsx');  
    }
    


    /////////////////////////////modales
    /////////Publicar a la red
openDialogPublicarRed(unidadesTraspaso: any[]): void {
  this.ListUnidadesDialog = unidadesTraspaso.filter(uni => uni.bitChecked);

  const dialogRefMasive = this.dialog.open(PublicarRedComponent, {
    width: '1000px',
    data:this.ListUnidadesDialog , 
  });
  //console.log(this.ListUnidadesDialog);
}

/////////Traspasos
openDialogTraspasos(unidadesTraspaso: any): void {
  const dialogRef = this.dialog.open(TrasladosDialogComponent, {
    width: '1000px',
    data: {unidadesModel: unidadesTraspaso
        },
  });
}

/////////transferencias
openDialogMasiveTransferencias(unidadesTraspaso: any[]): void {
  this.ListUnidadesDialog = unidadesTraspaso.filter(uni => uni.bitChecked);

  const dialogRefMasive = this.dialog.open(TransferenciasComponent, {
    width: '1000px',
    data:this.ListUnidadesDialog , 
  });
  //console.log(this.ListUnidadesDialog);
}

//////traspasos masivos
openDialogMasiveTraspasos(unidadesTraspaso: any[]): void {
  this.ListUnidadesDialog = unidadesTraspaso.filter(uni => uni.bitChecked);
  this.ListUnidadesDialog.forEach(unidad=>{
    this.unidadesServices
    .getLocalidadesCombo(unidad.gfx)
    .subscribe((_ListLocalidadesCombo:any[]) => {
      unidad.listlocalidades = _ListLocalidadesCombo
      }); 
      console.log(unidad.listlocalidades);
  });
  const dialogRefMasive = this.dialog.open(MasiveTrasladosComponent, {
    width: '1000px',
    data:this.ListUnidadesDialog , 
  });
  //console.log(this.ListUnidadesDialog);
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
  VentasUnidad:any[] = [];
  TraspasosUnidad:any[] = [];
  Pedidos:any[] = [];

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<ListadoUnidadesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getDetalleUnidad(this.data);
    this.getVentas(this.data);
    this.getTraspasos(this.data);
    this.getPedidos(this.data);
  } 
  ngOnInit(): void {

  }

  getPedidos(strvin:string): void{

    this.unidadesServices
    .getPedidos(strvin)
    .subscribe((_pedidos:any[]) => { 
      this.Pedidos = _pedidos
      });
  }

  getTraspasos(strvin:string): void{
    if(strvin == undefined
      || strvin == ''){
        strvin = ' ';
      }
    this.unidadesServices
    .getTraspasosPoVIN(strvin)
    .subscribe((_traspasos:any[]) => { 
      this.TraspasosUnidad = _traspasos
      });
  }

  getVentas(strvin:string): void{
    if(strvin == undefined
      || strvin == ''){
        strvin = ' ';
      }
    this.unidadesServices
    .getVentasPoVIN(strvin)
    .subscribe((_unidad:any[]) => { 
      this.VentasUnidad = _unidad
      });
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