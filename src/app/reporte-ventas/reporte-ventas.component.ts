import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {UnidadesService} from '../services/unidades.service';
import * as XLSX from 'xlsx'; 
import { PageEvent } from '@angular/material/paginator';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  @ViewChild('tableRepVentas', { static: false })
  tableRepVentas!: ElementRef; 

  constructor(public unidadesServices: UnidadesService) { }

  ListReporteVentas: any[] = [];
  ListClasCorpoCombo: any[] = [];
  ListDistribuidoresCombo: any[] = [];
  ListLocalidadesCombo: any[] = [];

  localidad:any = ' ';
  
  //busquedas
  vinBus2 = '';
  pedBus = '';
  folioBus = '';

  strBusqueda = ' ';
  idClasCorp: any = 0;
  intGFX: any = 0;
  fechaInicial: any = '1900-01-01';
  fechaFinal: any = '1900-01-01' ;
  fechaInicial1:any;
  fechaFinal1:any;
  strTipoPedido: any  = 0;
  strTipoVenta = ' ';






    //paginacinoes
    page_size: number = 20;
    page_number: number = 1;

  ngOnInit(): void {
    this.getVentas();
    this.getClasificacioCorporativaCombo();
    this.getDistribuidoresCombo();

  }

  getVentas(): void{
    
    this.unidadesServices
    .getReporteVentas(  this.strBusqueda,this.idClasCorp, this.intGFX,this.fechaInicial,this. fechaFinal, this.strTipoPedido, this.strTipoVenta)
    .subscribe((_ventas:any[]) => {
      this.ListReporteVentas = _ventas 
      });
  }

  ExportTOExcelUnidades() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableRepVentas.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Ventas');  
    XLSX.writeFile(wb, 'Reporte_Ventas.xlsx');  
  }
  
  handlePageRepVentas(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  getClasificacioCorporativaCombo(){
    this.unidadesServices
    .getClasCorpoCombo()
    .subscribe((_ListClasCorpoCombo:any[]) => {
      this.ListClasCorpoCombo = _ListClasCorpoCombo
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
    this.intGFX= e;
    this.localidad = ' ';

    this.getVentas();

    this.unidadesServices
    .getLocalidadesCombo(this.intGFX)
    .subscribe((_ListLocalidadesCombo:any[]) => {
      this.ListLocalidadesCombo = _ListLocalidadesCombo
      });
  }

  buscaPorClasCorpo(e: Event){
    //alert(form.value.formAntiguedad);
    this.idClasCorp = e;
    this.getVentas();

  }

  getLocalidades(e: Event){
    //alert(e);
    //alert(this.GFX);
      this.localidad = e;

      this.getVentas();
  
    }

    buscaPorTipoPedido(e: Event){
      //alert(form.value.formAntiguedad);
      this.strTipoPedido = e;  
      this.getVentas();
    }

  busquedaPorTexto(form: NgForm) {
    this.strBusqueda = form.value.formBusquedaVIN;
    if (this.strBusqueda == '')
      this.strBusqueda = ' ';

    this.getVentas();
  }

  buscaUnidadesPorFechas(form:NgForm): void{

    this.fechaInicial = form.value.fechaInicial;
    this.fechaFinal = form.value.fechaFinal;


    //alert(this.fechaInicialVenta) 

 if(this.fechaInicial == null){this.fechaInicial = '1900-01-01'}
 if(this.fechaFinal == null){this.fechaFinal = '1900-01-01'}

 this.getVentas();
  }

}
