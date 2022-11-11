import { ThisReceiver } from '@angular/compiler';
import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {UnidadesService} from '../services/unidades.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Console, groupCollapsed } from 'console';
import * as XLSX from 'xlsx'; 

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
  public numAntiguedad: number = 0;
  strBusqueda = '';

  vinBus = '';
  vinBus2 = '';
  ModeloBus = '';
  strVIN = '';
  

  //paginacinoes
  page_size: number = 20;
  page_number: number = 1;

  //UNIDADES POR VIN
  page_sizeUni: number = 20;
  page_numberUni: number = 1;

  displayedColumns: string[] = ['vin','modelo','claseCorporativa'];

  constructor(public unidadesServices: UnidadesService) { }

  

  ngOnInit(): void {
    this.buscadatos();
  }

  buscadatos(){
    this.getUnidades(20,1,' ', ' ',0,0,'');
    this.getClasesCorporativa();
    this.getModelos(0,0,0,0,'');
    this.getClasesCorporativaByAntiguedad();
  }

  buscaPorAntiguedad(intPageSize: number,intPageNum: number,strModelo: string,strVIN: string,form:NgForm){
    //alert(form.value.formAntiguedad);
    this.strBusqueda = form.value.formBusqueda;

    this.getUnidades(20,1,' ', ' ',form.value.formAntiguedad,0,this.strBusqueda);
    this.getClasesCorporativa();
    this.getModelos(0,0,0,form.value.formAntiguedad,this.strBusqueda);
    this.getClasesCorporativaByAntiguedad();
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

  getUnidades(intPageSize: number,intPageNum: number,strModelo: string,strVIN: string, idAntiguedad: number,idCorp: number,strBusqueda:string): void{
    if(strBusqueda == undefined
      || strBusqueda == ''){
        strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllUnidades(intPageSize,intPageNum,strModelo,strVIN,idAntiguedad,idCorp,strBusqueda)
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

  getClasesCorporativa(): void{

    if(this.strBusqueda == undefined
      || this.strBusqueda == ''){
        this.strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllClasesCorporativa(this.strBusqueda)
    .subscribe((_Clases:any[]) => {
      this.ListClasesCorpo = _Clases 
      });
  }

  getClasesCorporativaByAntiguedad(): void{

    if(this.strBusqueda == undefined
      || this.strBusqueda == ''){
        this.strBusqueda = ' ';
      }

    this.unidadesServices
    .getAllClasesCorporativaByAntiguedad(this.strBusqueda)
    .subscribe((_Clases:any[]) => {
      this.ListClasesCorpoByAntiguedad = _Clases 
      });
  }



  getModelos(pageSize: number, pageNumber: number, IdClasCorp:number, idAntiguedad: number,strBusqueda:string): void{
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
    .getModelosPorClase(pageSize,pageNumber,IdClasCorp,idAntiguedad,strBusqueda)
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
      this.getUnidades(20,1,' ',' ',0,0,'');
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
  console.log(item.bitExpandir);
  item.bitExpandir = true;
});
//this.ListModelos.forEach((item2:{bitExpandir:Boolean}) =>{
  //console.log(item2.bitExpandir);
  //item2.bitExpandir = true;
//})
}
else{
  this.muestraModelos = false;
  this.ListClasesCorpo.forEach((item:{bitExpandir:Boolean}) =>{
    console.log(item.bitExpandir);
    item.bitExpandir = false;
  });
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


}
