import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UnidadesService {

  constructor(private http: HttpClient) { }



  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //'Access-Control-Allow-Headers': 'Origin,Content-Type,X-Auth-Token, X-API-KEY, X-Requested-With, Accept, Access-Control-Request-Method'
    'Access-Control-Allow-Headers': 'Origin,Content-Type,X-Auth-Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
    //'Content-Type': 'application/x-www-form-urlencoded' 
  })

  getAllUnidades(intPageSize: number,intPageNum: number, strModelo: string, strVIN: string, idAntiguedad:number, idCorp:number, strBusqueda:string
    ,intGFX:any,intLocalidad: any,intClasCorpo:any, pendTraspaso:boolean,strTipoPedido:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/' + intPageSize + '/' + intPageNum + '/' + strModelo + '/'  + strVIN + '/'
    + idAntiguedad + '/' + idCorp + '/' + strBusqueda + '/'+ intGFX + '/' + intLocalidad + '/'  + intClasCorpo + '/' + pendTraspaso + '/'
    + strTipoPedido + '/' + window[<any>'varGlobal_User'] + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getAllUnidadesCount(intPageSize: number,intPageNum: number, strModelo: string, strVIN: string
    ,intGFX:any,intLocalidad: number,intClasCorpo:any, pendTraspaso:boolean){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/' + intPageSize + '/' + intPageNum + '/' + strModelo + '/'  + strVIN + '/'
    + '/'+ intGFX + '/' + intLocalidad + '/' + intClasCorpo + '/' + pendTraspaso + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getAllClasesCorporativa(idAntiguedad:number,strBusqueda: string,intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean, strTipoPedido:string){
    
    const url_api_Request_Clases = environment.hostUrl + '/ClasesCorporativas/GetClasesCorporativa/' + strBusqueda + '/'
    + intGFX + '/' + intLocalidad + '/'  + stridClasCorpo + '/' + pendTraspaso + '/' + idAntiguedad + '/' + strTipoPedido + '/' + window[<any>'varGlobal_User'] + '/';
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  getAllClasesCorporativaByAntiguedad(strBusqueda: string,intGFX:any,intLocalidad: any, stridClasCorpo:number, pendTraspaso:boolean, strTipoPedido :string){
    
    const url_api_Request_Clases = environment.hostUrl + '/ClasesCorporativas/GetClasesCorporativaByAntiguedad/' + strBusqueda + '/'
    + intGFX + '/' + intLocalidad + '/'  + stridClasCorpo + '/' + pendTraspaso + '/' + strTipoPedido + '/'  + window[<any>'varGlobal_User'] + '/';
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  getModelosPorClase(intPageSize: number,intPageNum: number,IdClasCorp:number, idAntiguedad: number,strBusqueda: string
    ,intGFX:any,intLocalidad: any,intClasCorpo:any, pendTraspaso:boolean, strTipoPedido: string){
    const url_api_Request_Modelos = environment.hostUrl + '/ClasesCorporativas/GetModelosPorClase/' + intPageSize + '/' + intPageNum + '/' + IdClasCorp + '/'
    + idAntiguedad + '/' + strBusqueda + '/' + intGFX + '/' + intLocalidad + '/'  + intClasCorpo + '/' + pendTraspaso + '/' + strTipoPedido + '/' + window[<any>'varGlobal_User'] + '/';
    return this.http.get<any[]>(url_api_Request_Modelos); 
  }

  getModelosPorClaseCount(IdClasCorp:number){
    const url_api_Request_Modelos = environment.hostUrl + '/ClasesCorporativas/GetModelosPorClaseCount/' + IdClasCorp + '/';
    return this.http.get<number>(url_api_Request_Modelos); 
  }

  getDistribuidoresCombo(){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetDealersCombo/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getLocalidadesCombo(gfx: any){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetLocalidadesCombo/' + gfx + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getClasCorpoCombo(){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/ClasCorpoCombo/';
    return this.http.get<any[]>(url_api_Request); 
  }

  mandaAPendientes(unidades:any[]){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/EnviarAPendientes/' + window[<any>'varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,unidades,{headers: this.headers})
    .pipe(map(data => data));
  }


  ////modal

  aceptaRechazaTransferencia(unidades:any,tipoConsulta:number, sucursalNueva:number,strVIN:string, distribuidorNuevo:number){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/AceptaRechazaTransferencia/' + window[<any>'varGlobal_User'] + '/' + tipoConsulta + '/' + sucursalNueva + '/'
    + strVIN + '/' + distribuidorNuevo + '/' // + window['varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

  solicitaTraspaso(unidades:any,tipoConsulta:number, sucursalNueva:number,strVIN:string){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/SolicitaTraspaso/'+ window[<any>'varGlobal_User'] + '/' + tipoConsulta + '/' + sucursalNueva + '/'
    + strVIN + '/' // + window['varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

  getAllUnidadesPoVIN( strBusqueda:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetunidadesByVIN/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getDetalleVIN( strVIN:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetDetalleVIN/' + strVIN + '/';
    return this.http.get<any>(url_api_Request); 
  }

  getVentasPoVIN( strBusqueda:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetVentasByVIN/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getTraspasosPoVIN( strBusqueda:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetTraspasosByVIN/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getPedidos( strBusqueda:string){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetPedidos/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  insertaPendientes(strVIN:string){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/InsertarPendientes/' + strVIN + '/' // + window['varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

  getPendientesRegistroVenta(){
    const url_api_Request_Clases = environment.hostUrl + '/vw_Unidades/GetPendientesRegistroVenta/';
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  eliminaRegistro(strVIN:string){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/EliminaRegistro/' + strVIN + '/' // + window['varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

  getDistribuidoresComboTraslados(){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetDealersComboTraslados/';
    return this.http.get<any[]>(url_api_Request); 
  }

  solicitaTrasferencia(unidades:any,tipoConsulta:number, distribuidorNuevo:number,strVIN:string, pk_TipoPago: number){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/SolicitaTransferencia/'+ window[<any>'varGlobal_User'] + '/' + tipoConsulta + '/' + distribuidorNuevo + '/'
    + strVIN + '/' + pk_TipoPago + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

  getTiposPago(){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/GetTiposPago/';
    return this.http.get<any[]>(url_api_Request); 
  }

  apartaUnidad(idUnidad:number){
    const url_api_SolicitaReProceso= environment.hostUrl + '/vw_Unidades/ApartaUnidad/' + idUnidad + '/' + window[<any>'varGlobal_User'] + '/';
    //alert(url_api_SolicitaReProceso);
    return this.http
    .post<any[]>(url_api_SolicitaReProceso,{headers: this.headers})
    .pipe(map(data => data));
  }

}
