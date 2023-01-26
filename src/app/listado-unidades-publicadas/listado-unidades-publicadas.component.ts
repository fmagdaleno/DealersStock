import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { ComunService } from '../services/comun.service';
import {UnidadesService} from '../services/unidades.service';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component'



@Component({
    selector: 'app-listado-unidades-publicadas',
    templateUrl: './listado-unidades-publicadas.component.html',
    styleUrls: ['./listado-unidades-publicadas.component.css']
  })
export class ListadoUnidadesPublicadasComponent implements OnInit {
  ListClasCorpoCombo: any[] = [];
  ListModeloPub: any[] = [];
  ListAnios: any[] = [];
  ListEstados: any[] = [];
  ListDistribuidores: any[] = [];
  ListEstatus: any[] = [];
  listUnidades: any[] = [];
  selectedClasCorp: number = 0;
  selectedModPub: string = 'Todos';
  selectedAnioPub: string = 'Todos';
  selectedEstados: number = 0;
  selectedDistribuidores: number = 0;
  selectedEstatus: number = 0;
  Vin: string = '';
    
  constructor(public dialog: MatDialog, public comunSrv: ComunService, public unidadesServices: UnidadesService) { }

  ngOnInit(): void {
    this.getClasificacioCorporativaCombo();
    this.cambiaSegmento();
  }

  buscar(){
    var svin = (this.Vin == '' ? ' ' : this.Vin);
    this.comunSrv.get('/publicadas/ObtenerUnidadesPublicado/' + this.selectedClasCorp + '/' + this.selectedModPub + '/' 
                  + this.selectedAnioPub + '/' + this.selectedEstados + '/' + this.selectedDistribuidores + '/' 
                  + svin + '/' + this.selectedEstatus)
    .subscribe((_Clases:any[]) => {       
          this.listUnidades = _Clases;
      });
  }
  
  cambiaSegmento(){
    this.getModelosPublicados();
    this.getAniosPublicados();
    this.getEstadosPublicados();
    this.getDistribuidorPublicados();
    this.getEstatusPublicados();
    this.buscar();
  }

  cambiarModelo(){
    this.getAniosPublicados(); 
    this.getEstadosPublicados();
    this.getDistribuidorPublicados();
    this.getEstatusPublicados();
    this.buscar();
  }

  CambiarAnio(){    
    this.getEstadosPublicados();
    this.getDistribuidorPublicados();
    this.getEstatusPublicados();
    this.buscar();
  }
  
  CambiarEstado(){    
      this.getDistribuidorPublicados();
      this.getEstatusPublicados();
      this.buscar();
  }

  CambiarDistribuidor(){    
    this.getEstatusPublicados();
    this.buscar();
  }

  CambiarEstatus(){
      
      this.buscar();
  }

  getClasificacioCorporativaCombo(){
    this.unidadesServices.getClasCorpoCombo()
        .subscribe((_ListClasCorpoCombo:any[]) => {
          this.ListClasCorpoCombo = _ListClasCorpoCombo
      });
  }

  getModelosPublicados(){
    this.comunSrv.get('/publicadas/ObtenerModeloPublicado/' + this.selectedClasCorp)
    .subscribe((_Clases:any[]) => {
        var arr: any = {};
        arr.idClasCorp = 1;
        arr.modelo= 'Todos';
        _Clases.unshift(arr);
          this.ListModeloPub = _Clases;
          this.selectedModPub = 'Todos';
      });
  }

  getAniosPublicados(){
    this.comunSrv.get('/publicadas/ObtenerAnioPublicado/' + this.selectedClasCorp + '/' + this.selectedModPub)
    .subscribe((_Clases:any[]) => {
        var arr: any = {};
        arr.cd_aniomodelo = 'Todos';
        arr.nu_aniomodelo= 'Todos';
        _Clases.unshift(arr);
          this.ListAnios = _Clases;
          this.selectedAnioPub = 'Todos';
      });
  }

  getEstadosPublicados(){
    this.comunSrv.get('/publicadas/ObtenerEstadoPublicado/' + this.selectedClasCorp + '/' + this.selectedModPub + '/' + this.selectedAnioPub)
    .subscribe((_Clases:any[]) => {
        var arr: any = {};
        arr.idEstado = 0;
        arr.descEstado= 'Todos';
        _Clases.unshift(arr);
          this.ListEstados = _Clases;
          this.selectedEstados = 0;
      });
  }

  getDistribuidorPublicados(){
    this.comunSrv.get('/publicadas/ObtenerDistribuidorPublicado/' + this.selectedClasCorp + '/' + this.selectedModPub + '/' 
                      + this.selectedAnioPub + '/' + this.selectedEstados)
    .subscribe((_Clases:any[]) => {
        var arr: any = {};
        arr.idDistribuidor = 0;
        arr.descDistribuidor= 'Todos';
        _Clases.unshift(arr);
          this.ListDistribuidores = _Clases;
          this.selectedDistribuidores = 0;
      });
  }

  getEstatusPublicados(){
    this.comunSrv.get('/publicadas/ObtenerEstatusPublicado/' + this.selectedClasCorp + '/' + this.selectedModPub + '/' 
                  + this.selectedAnioPub + '/' + this.selectedEstados + '/' + this.selectedDistribuidores)
    .subscribe((_Clases:any[]) => {
        var arr: any = {};
        arr.idEst = 0;
        arr.descEst= 'Todos';
        _Clases.unshift(arr);
          this.ListEstatus = _Clases;
          this.selectedEstatus = 0;
      });
  }

  solicitarTransferencia(unidad:any): void {
    this.dialog
      .open(DialogoConfirmacionComponent, {
        data: 'La unidad será solicitada al distribuidor para serle transferida  ¿Desea continuar?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.unidadesServices.apartaUnidad(unidad.idUnidad)
          .subscribe(complete =>{
            //this.buscadatos(false);
            this.cambiaSegmento();
            alert("Unidad solicitada.");
        });
        } else {
          alert("La unidad no fue solicitada.");
        }
      });
  }


}