import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {UnidadesService} from '../services/unidades.service';
import * as XLSX from 'xlsx'; 
import { PageEvent } from '@angular/material/paginator';
import { FormControl, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-unidades-entregadas',
  templateUrl: './unidades-entregadas.component.html',
  styleUrls: ['./unidades-entregadas.component.css']
})
export class UnidadesEntregadasComponent implements OnInit {
  @ViewChild('tableunidadesEntregadas', { static: false })
  tableunidadesEntregadas!: ElementRef; 

  constructor(public unidadesServices: UnidadesService) { }

  ListUnidadesEncontradas: any[] = [];
  ListClasCorpoCombo: any[] = [];
  ListDistribuidoresCombo: any[] = [];
  ListLocalidadesCombo: any[] = [];

  localidad:any = ' ';
  intTipoReporte:any = ' ';

  boolEntregadas: boolean = true;
  
  //busquedas
  vinBus2 = '';
  pedBus = '';
  folioBus = '';

  strBusqueda = ' ';
  idClasCorp: any = 0;
  intGFX: any = 0;
  fechaInicialVenta1:any;
  fechaFinalVenta1:any;
  fechaInicialDTU1:any;
  fechaFinalDTU1 :any;


  fechaInicialVenta:any = '1900-01-01';
  fechaFinalVenta:any = '1900-01-01';
  fechaInicialDTU:any = '1900-01-01';
  fechaFinalDTU :any = '1900-01-01';

    //paginacinoes
    page_size: number = 20;
    page_number: number = 1;

  ngOnInit(): void {
    this.getUnidadesEntregadas();
    this.getClasificacioCorporativaCombo();
    this.getDistribuidoresCombo();
  }

  getUnidadesEntregadas(): void{
    
    this.unidadesServices
    .getunidadesEntregadas(this.strBusqueda,this.idClasCorp, this.intGFX,this.fechaInicialVenta,this.fechaFinalVenta, this.boolEntregadas
                          ,this.fechaInicialDTU,this.fechaFinalDTU)
    .subscribe((_ventas:any[]) => {
      this.ListUnidadesEncontradas = _ventas 
      });
  }

  ExportTOExcelUnidades() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableunidadesEntregadas.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Unidades entregadas');  
    XLSX.writeFile(wb, 'UnidadesEntregadas.xlsx');  
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

    this.getUnidadesEntregadas();

    this.unidadesServices
    .getLocalidadesCombo(this.intGFX)
    .subscribe((_ListLocalidadesCombo:any[]) => {
      this.ListLocalidadesCombo = _ListLocalidadesCombo
      });
  }

  buscaPorClasCorpo(e: Event){
    //alert(form.value.formAntiguedad);
    this.idClasCorp = e;
    this.getUnidadesEntregadas();

  }

  getLocalidades(e: Event){
    //alert(e);
    //alert(this.GFX);
      this.localidad = e;

      this.getUnidadesEntregadas();
  
    }

    busquedaPorTexto(form:NgForm){
      this.strBusqueda = form.value.formBusquedaVIN;
if(this.strBusqueda == '')
this.strBusqueda = ' ';

      this.getUnidadesEntregadas();
    }

    buscaUnidadesPorFechas(form:NgForm): void{

      this.fechaInicialVenta = form.value.fechaInicialVenta;
      this.fechaFinalVenta = form.value.fechaFinalVenta;
      this.fechaInicialDTU = form.value.fechaInicialDTU;
      this.fechaFinalDTU = form.value.fechaFinalDTU;

      //alert(this.fechaInicialVenta) 

   if(this.fechaInicialVenta = null){this.fechaInicialVenta = '1900-01-01'}
   if(this.fechaFinalVenta = null){this.fechaFinalVenta = '1900-01-01'}
   if(this.fechaInicialDTU = null){this.fechaInicialDTU = '1900-01-01'}
   if(this.fechaFinalDTU = null){this.fechaFinalDTU = '1900-01-01'}

      this.getUnidadesEntregadas();
    }

  cambiaTipoReporte(e: Event) {
    this.intTipoReporte = e;

    if (this.intTipoReporte == 1) { this.boolEntregadas = true; }
    else { this.boolEntregadas = false; }
    //if(e == 1){this.boolEntregadas = true;}
    //else{this.boolEntregadas = false;}
    this.getUnidadesEntregadas();
  }

}
