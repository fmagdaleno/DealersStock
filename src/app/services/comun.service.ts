import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ComunService {

  constructor(private http: HttpClient) { }



  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //'Access-Control-Allow-Headers': 'Origin,Content-Type,X-Auth-Token, X-API-KEY, X-Requested-With, Accept, Access-Control-Request-Method'
    'Access-Control-Allow-Headers': 'Origin,Content-Type,X-Auth-Token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
    //'Content-Type': 'application/x-www-form-urlencoded' 
  })

  get(strurl: string){    
    const url_api_Request_Clases = environment.hostUrl + strurl;
    return this.http.get<any[]>(url_api_Request_Clases); 
  }

  post(strurl: string, data: any){    
    const url_api_Request_Clases = environment.hostUrl + strurl;
    return this.http.post<any>(url_api_Request_Clases, data,  { 'headers':this.headers }); 
  }
}