import { ThisReceiver } from '@angular/compiler';
import { Component,ElementRef,Inject,OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {UnidadesService} from '../services/unidades.service';
import { FormControl, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Console, groupCollapsed } from 'console';
import * as XLSX from 'xlsx'; 
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
//import {TrasladosDialogComponent} from '../traslados-dialog/traslados-dialog.component';


export class Group {
  level = 0;
  parent: any;
  expanded = true;
  totalCounts = 0;
  prueba: [] = [];
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}


export interface DialogData {
  unidadesModel: any;
}



@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})

export class UnidadesComponent implements OnInit {
  @ViewChild('tableUnit', { static: false })
  tableUnit!: ElementRef; 

    ListUnidades: any[] = [];
  ListUnidadesPorModelo: any[] = [];
  ListClasesCorpo: any[] = [];
  ListClasesCorpoByAntiguedad: any[] = []; 
  ListModelos: any[] = [];
  ListDistribuidoresCombo: any[] = [];
  ListLocalidadesCombo: any[] = [];
  ListClasCorpoCombo: any[] = [];
  listaSeleccionada:any[] = [];
  ListModelosCount: number = 0;
  intTipoBusqueda: number = 1;
  IdClasCorpActual:number = 0;
  strModeloActual:string = '';
  muestraModelos:boolean = false;
  muestraVIN:boolean = false;
  muestraUnidades:boolean = false;
  openAllGroups: boolean=true;
  listConteoModelos!: { idClasCorp: number, numReg: number; };
  listModelosTemp:any[] = [];
  listaIdAntiguedad:number[]=[1,2,3,4,5,6];
  //columnasUnidad:string[]=['',2,3,4,5,6];
  public numAntiguedad: number = 0;
  strBusqueda = '';
  stridAntiguedad: any = 0;
  stridClasCorpo: any = 0;
  GFX:any = 0;
  localidad:any = ' ';
  ListUnidadesDialog: any[] = [];
  dialogRefMasive:any;
 

  vinBus = '';
  vinBus2 = '';
  ModeloBus = '';
  strVIN = '';

  ////id columnas
  col1 = true;
  col2 = true;
  col3 = true;
  col4 = true;
  col5 = true;
  col6 = true;
  col7 = true;
  col8 = true;
  col9 = true;
  col10 = true;
  col11 = true;
  selectedObjects: any;

  //paginacinoes
  page_size: number = 20;
  page_number: number = 1;

  //UNIDADES POR VIN
  page_sizeUni: number = 20;
  page_numberUni: number = 1;

  //MODALES


  displayedColumns: string[] = ['vin','modelo','claseCorporativa'];

  columnasList: any = [
    {value: '1', label:'VIN'},
    {value:'2', label:'Modelo'},
    {value:'3', label:'Clase corporativa'},
    {value:'4', label:'Distribuidor'},
    {value:'5', label:'Motor'},
    {value:'6', label:'Fecha inventario'},
    {value:'7', label:'Días plan'},
    {value:'8', label:'Estatus'},
    {value:'9', label:'Antigüedad'},
    {value:'10', label:'Sucursal'},
    {value:'11', label:'Pedido'}
  ];

  constructor(public unidadesServices: UnidadesService
    ,public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.buscadatos(false);

    this.selectedObjects = ['1','2','3','4','5','6','7','8','9','10','11'];

  }



  buscadatos(pendTraspaso: boolean){
    this.getUnidades(20,1,' ', ' ',0,0,this.strBusqueda,0,' ',0,pendTraspaso);
    this.getClasesCorporativa(0,' ',0,pendTraspaso);
    this.getModelos(0,0,0,0,this.strBusqueda,0,' ',0,pendTraspaso);
    this.getClasesCorporativaByAntiguedad(0,' ',0,pendTraspaso);
    this.getDistribuidoresCombo();
    this.getClasificacioCorporativaCombo();
  }



busquedaPorTexto(intPageSize: number,intPageNum: number,strModelo: string,strVIN: string,form:NgForm){
  this.strBusqueda = form.value.formBusqueda;

  this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getClasesCorporativa( this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getModelos(0,0,0,this.stridAntiguedad,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getClasesCorporativaByAntiguedad(this.GFX,this.localidad,this.stridClasCorpo,false);
}

muestraColumnas(e: Event){
  
  this.stridAntiguedad = e + '';

  this.col1 = false;
  this.col2 = false;
  this.col3 = false;
  this.col4 = false; 
  this.col5 = false; 
  this.col6 = false; 
  this.col7 = false; 
  this.col8 = false;
  this.col9 = false; 
  this.col10 = false;
  this.col11 = false;

  this.stridAntiguedad.split(',').forEach((element: string) => {
    //alert(element);
    if(element == '1'){this.col1 = true;} 
    if(element == '2'){this.col2 = true;} 
    if(element == '3'){this.col3 = true;} 
    if(element == '4'){this.col4 = true;} 
    if(element == '5'){this.col5 = true;} 
    if(element == '6'){this.col6 = true;} 
    if(element == '7'){this.col7 = true;} 
    if(element == '8'){this.col8 = true;}
    if(element == '9'){this.col9 = true;} 
    if(element == '10'){this.col10 = true;}
    if(element == '11'){this.col11 = true;}
  });

  //alert(this.stridAntiguedad.split(','));

}

buscaPorDistribuidor(e: Event){
  //alert(form.value.formAntiguedad);
  this.stridAntiguedad = e;

  this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getClasesCorporativa(this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getModelos(0,0,0,this.stridAntiguedad,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
  this.getClasesCorporativaByAntiguedad(this.GFX,this.localidad,this.stridClasCorpo,false);
}

  buscaPorAntiguedad(e: Event){
    //alert(form.value.formAntiguedad);
    this.stridAntiguedad = e;

    this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getClasesCorporativa(this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getModelos(0,0,0,this.stridAntiguedad,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getClasesCorporativaByAntiguedad(this.GFX,this.localidad,this.stridClasCorpo,false);
  }

  buscaPorClasCorpo(e: Event){
    //alert(form.value.formAntiguedad);
    this.stridClasCorpo = e;

    this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getClasesCorporativa(this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getModelos(0,0,0,this.stridAntiguedad,this.strBusqueda, this.GFX,this.localidad,this.stridClasCorpo,false);
    this.getClasesCorporativaByAntiguedad(this.GFX,this.localidad,this.stridClasCorpo,false);
  }


  /*buscaVIN(intPageSize: number,intPageNum: number,form:NgForm): void{
    if(form.value.idBusquedaVIN == undefined
      || form.value.idBusquedaVIN == ''){
          this.strVIN = ' ';
        }
      else{
        this.strVIN = form.value.idBusquedaVIN;
      }

    this.getUnidades(this.page_size,this.page_number,' ',this.strVIN,0,0)

  }*/

  getUnidades(intPageSize: number,intPageNum: number,strModelo: string,strVIN: string, idAntiguedad: number,idCorp: number,strBusqueda:string,
    intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean ): void{
    if(strBusqueda == undefined
      || strBusqueda == ''){
        strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllUnidades(intPageSize,intPageNum,strModelo,strVIN,idAntiguedad,idCorp,strBusqueda, intGFX,intLocalidad,stridClasCorpo,pendTraspaso)
    .subscribe((_unidades:any[]) => {
      this.ListUnidades = _unidades 
      });
  }

  getUnidadesPorModelo(intPageSize: number,intPageNum: number,strModelo: string,modelo:any): void{
    this.strModeloActual = strModelo;
    modelo.bitExpandir = true;
    //this.unidadesServices
    //.getAllUnidades(intPageSize,intPageNum,strModelo,' ')
    //.subscribe((_unidades:any[]) => {
      //this.ListUnidadesPorModelo = _unidades 
     // });
      this.muestraUnidades = true;
  }

  getClasesCorporativa(intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean): void{

    if(this.strBusqueda == undefined
      || this.strBusqueda == ''){
        this.strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllClasesCorporativa(this.stridAntiguedad,this.strBusqueda,intGFX,intLocalidad, stridClasCorpo, pendTraspaso)
    .subscribe((_Clases:any[]) => {
      this.ListClasesCorpo = _Clases 
      });
  }

  getClasesCorporativaByAntiguedad(intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean): void{

    if(this.strBusqueda == undefined
      || this.strBusqueda == ''){
        this.strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllClasesCorporativaByAntiguedad(this.strBusqueda,intGFX,intLocalidad, stridClasCorpo, pendTraspaso)
    .subscribe((_Clases:any[]) => {
      this.ListClasesCorpoByAntiguedad = _Clases 
      });
  }

  getDistribuidoresCombo(){
    this.unidadesServices
    .getDistribuidoresCombo()
    .subscribe((_ListDistribuidoresCombo:any[]) => {
      this.ListDistribuidoresCombo = _ListDistribuidoresCombo
      });
  }

  getLocalidadesByDistribuidor(e: Event){
    this.GFX= e;
    this.localidad = ' ';

    this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda,this.GFX,this.localidad,this.stridClasCorpo,false);

    this.unidadesServices
    .getLocalidadesCombo(e)
    .subscribe((_ListLocalidadesCombo:any[]) => {
      this.ListLocalidadesCombo = _ListLocalidadesCombo
      });
  }

  getClasificacioCorporativaCombo(){
    this.unidadesServices
    .getClasCorpoCombo()
    .subscribe((_ListClasCorpoCombo:any[]) => {
      this.ListClasCorpoCombo = _ListClasCorpoCombo
      });
  }

  getLocalidades(e: Event){

    this.localidad = e;

    this.getUnidades(20,1,' ', ' ',this.stridAntiguedad,0,this.strBusqueda,this.GFX,this.localidad,this.stridClasCorpo,false);

  }



  getModelos(pageSize: number, pageNumber: number, IdClasCorp:number, idAntiguedad: number,strBusqueda:string,
    intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean): void{
    this.IdClasCorpActual = IdClasCorp;
    if(strBusqueda == undefined
      || strBusqueda == ''){
        strBusqueda = ' ';
      }
    /*if(pageNumber == 1){ 
      this.unidadesServices
      .getModelosPorClaseCount(IdClasCorp)
      .subscribe((numModelos:any) => {
        this.ListModelosCount = numModelos 
        });}*/

    this.unidadesServices
    .getModelosPorClase(pageSize,pageNumber,IdClasCorp,idAntiguedad,strBusqueda,intGFX,intLocalidad,stridClasCorpo,pendTraspaso)
    .subscribe((_Modelos:any[]) => {
      this.ListModelos = _Modelos  
      });
      this.muestraModelos = true;
  }

  getModelosPorClase(pageSize: number, pageNumber: number, IdClasCorp:number,clasesCorpo:any): void{
    this.IdClasCorpActual = IdClasCorp;
    clasesCorpo.bitExpandir = true;
    /*if(pageNumber == 1){ 
      this.unidadesServices
      .getModelosPorClaseCount(IdClasCorp)
      .subscribe((numModelos:any) => {
        this.ListModelosCount = numModelos 
        });}

    this.unidadesServices
    .getModelosPorClase(pageSize,pageNumber,IdClasCorp)
    .subscribe((_Modelos:any[]) => {
      this.ListModelos = _Modelos  
      });*/
      this.muestraModelos = true;
  }

  limpiaModelos(clasesCorpo: any){
    //this.ListModelos = [];
    //this.ListUnidadesPorModelo = [];
    this.muestraModelos = false;
    clasesCorpo.bitExpandir = false;
  }

  limpiaUnidades(modelo:any){
    //this.ListUnidadesPorModelo = [];
    this.muestraUnidades = false;
   modelo.bitExpandir = false;
  }

  reagrupaIOnventario(tipoAgrupador: number){
    //alert(tipoAgrupador);
    if(tipoAgrupador == 1){
      this.getUnidades(20,1,' ',' ',0,0,'',0,'',0,false);
    }
    this.intTipoBusqueda =tipoAgrupador;
  }

  valueChange( unidades:any, event:any) {
    //set the two-way binding here for the specific unit with the event
    unidades.bitChecked = event.checked;
    //this.dataApiInstalationRequest.selectedInstalationRequest = Object.assign({},Request);

}



//////////////paginaciones


handlePage(e: PageEvent, IdClasCorp:number){
  
  this.page_size = e.pageSize;
  this.page_number = e.pageIndex + 1;

  //setTimeout(() => {
   // this.getModelosPorClase(e.pageSize,e.pageIndex + 1,IdClasCorp)
 // },1000)
  
}

handlePageUnidadesVIN(e: PageEvent){
  this.page_sizeUni = e.pageSize;
  this.page_numberUni = e.pageIndex + 1;

  
}



expandeContrae(expandeContrae: number){
  //alert(tipoAgrupador);

if(expandeContrae ==1){
  this.muestraModelos = true;
this.ListClasesCorpo.forEach((item:{bitExpandir:Boolean}) =>{
  //console.log(item.bitExpandir);
  item.bitExpandir = true;
});

//this.ListClasesCorpoByAntiguedad.forEach((item2:{bitExpandir:Boolean}) =>{
  //console.log(item2.bitExpandir);
  //item2.bitExpandir = true;
//});
//this.ListModelos.forEach((item2:{bitExpandir:Boolean}) =>{
  //console.log(item2.bitExpandir);
  //item2.bitExpandir = true;
//})
}
else{
  this.muestraModelos = false;
  this.ListClasesCorpo.forEach((item:{bitExpandir:Boolean}) =>{
    //console.log(item.bitExpandir);
    item.bitExpandir = false;
  });

  //this.ListClasesCorpoByAntiguedad.forEach((item2:{bitExpandir:Boolean}) =>{
    //console.log(item2.bitExpandir);
    //item2.bitExpandir = false;
  //});
  //this.ListModelos.forEach((item2:{bitExpandir:Boolean}) =>{
    //console.log(item2.bitExpandir);
    //item2.bitExpandir = false ;
  //})
}
}



/////EXCEL

ExportTOExcelUnidades() {  
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableUnit.nativeElement);  
  const wb: XLSX.WorkBook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(wb, ws, 'Documentos cargados Histórico');  
  XLSX.writeFile(wb, 'DocumentosCargadosHistorico.xlsx');  
}

enviarAPendientes(listUnidades: any[]){
  this.unidadesServices.mandaAPendientes(listUnidades)
  .subscribe(complete =>{
    alert("Unidades enviadas a pendientes");
});   
}


///////////////////////////////////////////////////////////////////////////////////////modales

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

////////////////////////traslados aceptacion

@Component({
  selector: 'app-traslados-dialog',
  templateUrl: '../traslados-dialog/traslados-dialog.component.html',
  styleUrls: ['../traslados-dialog/traslados-dialog.component.css']
})
export class TrasladosDialogComponent implements OnInit {

  ListLocalidadesCombo: any[] = [];
  nuevaLocalidad: any;
  localidadRepetida: boolean = false;
  errorLocalidad: boolean = false;

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<TrasladosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {} 

  ngOnInit(): void {
    this.unidadesServices
    .getLocalidadesCombo(this.data.unidadesModel.gfx)
    .subscribe((_ListLocalidadesCombo:any[]) => {
      this.ListLocalidadesCombo = _ListLocalidadesCombo
      });
  }

  getNuevaLocalidad(e: Event){
    this.localidadRepetida = false;
    this.errorLocalidad = false;
    this.nuevaLocalidad = e;
  }

  guardarSolicitudTraspaso(unidadesModel: any, tipoConsulta: number){

    if(this.nuevaLocalidad == undefined
        && tipoConsulta == 1){
      this.errorLocalidad = true;
    }
    else if(this.nuevaLocalidad == unidadesModel.idLocalidad
      && tipoConsulta == 1){
      this.localidadRepetida = true;
    }
    else{
      if(tipoConsulta == 1){
        unidadesModel.idLocalidadNueva = this.nuevaLocalidad;
      }
      else{
        unidadesModel.idLocalidadNueva = unidadesModel.strLocalidadNueva;
      }
      
      this.unidadesServices.solicitaTraspaso(unidadesModel,tipoConsulta)
      .subscribe(complete =>{
        alert("Proceso terminado con exito");
    });
    
  }
}

}


///////////////////////TRANSFERENCIAS DIALOG

@Component({
  selector: 'app-transferencias',
  templateUrl: '../transferencias/transferencias.component.html',
  styleUrls: ['../transferencias/transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  ListLocalidadesCombo: any[] = [];
  nuevaLocalidad: any;
  localidadRepetida: boolean = false;
  errorLocalidad: boolean = false;
  maxSize: boolean = false;

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<TransferenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {} 

  ngOnInit(): void {

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


///////////////////////TRASLADOS MASIVOS

@Component({
  selector: 'app-masive-traslados',
  templateUrl: '../masive-traslados/masive-traslados.component.html',
  styleUrls: ['../masive-traslados/masive-traslados.component.css']
})
export class MasiveTrasladosComponent implements OnInit {

  ListLocalidadesCombo: any[] = [];
  nuevaLocalidad: any;
  localidadRepetida: boolean = false;
  errorLocalidad: boolean = false;
  maxSize: boolean = false;

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<MasiveTrasladosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {} 

  ngOnInit(): void {

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

  getNuevaLocalidad(e: Event){
    this.localidadRepetida = false;
    this.errorLocalidad = false;
    this.nuevaLocalidad = e;
  }

  guardarSolicitudTraspaso(unidadesModel: any, tipoConsulta: number){

    if(this.nuevaLocalidad == undefined
        && tipoConsulta == 1){
      this.errorLocalidad = true;
    }
    else if(this.nuevaLocalidad == unidadesModel.idLocalidad
      && tipoConsulta == 1){
      this.localidadRepetida = true;
    }
    else{
      if(tipoConsulta == 1){
        unidadesModel.idLocalidadNueva = this.nuevaLocalidad;
      }
      else{
        unidadesModel.idLocalidadNueva = unidadesModel.strLocalidadNueva;
      }

      alert(unidadesModel.idLocalidadNueva);

      unidadesModel.gfxNuevo = '0';

      unidadesModel.listlocalidades = [];

      console.log(unidadesModel);
      
      this.unidadesServices.solicitaTraspaso(unidadesModel,tipoConsulta)
      .subscribe(complete =>{
        alert("Proceso terminado con exito");
    });
    
  }
}

}

///////////////////////PUBLICAR A LA RED
@Component({
  selector: 'app-publicar-red',
  templateUrl: '../publicar-red/publicar-red.component.html',
  styleUrls: ['../publicar-red/publicar-red.component.css']
})
export class PublicarRedComponent implements OnInit {

  ListLocalidadesCombo: any[] = [];
  nuevaLocalidad: any;
  localidadRepetida: boolean = false;
  errorLocalidad: boolean = false;
  maxSize: boolean = false;

  constructor(public unidadesServices: UnidadesService,
    public dialogRef: MatDialogRef<PublicarRedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {} 

  ngOnInit(): void {

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