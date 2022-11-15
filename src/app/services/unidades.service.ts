import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    ,intGFX:any,intLocalidad: any){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/' + intPageSize + '/' + intPageNum + '/' + strModelo + '/'  + strVIN + '/'
    + idAntiguedad + '/' + idCorp + '/' + strBusqueda + '/'+ intGFX + '/' + intLocalidad + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getAllUnidadesCount(intPageSize: number,intPageNum: number, strModelo: string, strVIN: string
    ,intGFX:any,intLocalidad: number){
    const url_api_Request = environment.hostUrl + '/vw_Unidades/' + intPageSize + '/' + intPageNum + '/' + strModelo + '/'  + strVIN + '/'
    + '/'+ intGFX + '/' + intLocalidad + '/';
    return this.http.get<any[]>(url_api_Request); 
  }

  getAllClasesCorporativa(strBusqueda: string){
    
    const url_api_Request_Clases = environment.hostUrl + '/ClasesCorporativas/GetClasesCorporativa/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  getAllClasesCorporativaByAntiguedad(strBusqueda: string){
    
    const url_api_Request_Clases = environment.hostUrl + '/ClasesCorporativas/GetClasesCorporativaByAntiguedad/' + strBusqueda + '/';
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  getModelosPorClase(intPageSize: number,intPageNum: number,IdClasCorp:number, idAntiguedad: number,strBusqueda: string){
    const url_api_Request_Modelos = environment.hostUrl + '/ClasesCorporativas/GetModelosPorClase/' + intPageSize + '/' + intPageNum + '/' + IdClasCorp + '/'
    + idAntiguedad + '/' + strBusqueda + '/';
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

}
