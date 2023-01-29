import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ComunService } from '../services/comun.service';

//const swal = require('sweetalert');

export interface DialogData {
    animal: string;
    name: string;
  }

  export class factura {
    vin: string = "";
    folio: string = "";
  }

  export class Xml {
    version: string = '';
    serie: string = '';
    folio: string = '';
    fecha: string = '';
    fecha2: string = '';
    rfcEmisor: string = '';
    nombreEmisor: string = '';
    rfcReceptor: string = '';
    nombreReceptor: string = '';
    descripcion: string = '';
    vin: string = '';
    moneda: string = '';
    uuidRelacionado: string = '';
    uuid: string = '';
    tasaocuota: string = '';
    iva: number = 0;
    subTotal: number = 0;
    total: number = 0;
    guardado: boolean = false;
    existe: boolean = false;
    mensaje: string = '';
    cD_PEDIDO: string = '';
    nB_MODELO: string = '';
    cD_CLASIFCORP: string = '';
    nB_CLASIFCORP: string = '';
    idDealer: string = '';
    tX_TIPO_FLOTILLA: string = '';
  }

@Component({
    selector: 'app-captura-ventaxml',
    templateUrl: './captura-ventaxml.component.html',
  })
  export class DialogOverviewExampleDialog implements OnInit {
    factXml !: any;
    archivo: any[] = [];
    fac: factura = new factura();
    xm: Xml = new Xml();
    ntUser: string = 'YYYAXC4';
    public uploader: FileUploader = new FileUploader({ url: environment.hostUrl + '/Facturas/LeerXML' });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    maxSize: boolean = false;
  
    constructor(private http: HttpClient, public comunSrv: ComunService, 
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Xml) {
        this.factXml = [];
      }

      maximizeDialog(){
        this.dialogRef.addPanelClass('full-screen-modal');
        this.dialogRef.updateSize('100vw','100vh');
        this.maxSize = true;
     
      }
    
      minimizeDialog(){
        this.dialogRef.updateSize('1750px','650px');
        this.maxSize = false;
    
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    ngOnInit() {
      this.cargaFacturas();
    }
  
    cargaFacturas() {
      this.comunSrv.get('/Facturas/obtenerXML/' + this.ntUser)
        .subscribe(res => {
          this.factXml = res;
        }//, err => { swal("Consulta Incorrecta!", "No se han podido consultar los RFC! " + err, "error"); }
        )
    }

   /* this.comunSrv.get('/tipoclientes')
  .subscribe((_Clases:any[]) => {
    this.listTipoCli = _Clases 
    });
  }
  */

    initializeUploader() {
        //this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    
        this.uploader.onSuccessItem = (item, response, status, headers) => {
          if (response) {
            const res: factura = JSON.parse(response);
            const fac = {
              vin: res.vin,
              folio: res.folio
            };
            //this.photos.push(photo);
            //if (photo.isMain) {
            //    localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
            //}
          }
        };
      }

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }
  
    public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
    }

    Leer(item: any) {
        if (item.file.length === 0) {
          return;
        }
    
        console.log(item.file);
    
        let fileToUpload = item.file.rawFile;
        const formData = new FormData();
        //formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('file', fileToUpload, "Archivo.xml");
    
        this.http.post<string>(environment.hostUrl + '/Facturas/LeerXML/' + this.ntUser, formData, { reportProgress: true, observe: 'events', responseType: 'json' })
          .subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress)
                if (event.total) {
                  const total: number = event.total;
                  //this.progress = Math.round(100 * event.loaded / total);
                  item.isSuccess = true;
                }
                else {
                  //handle illegal state  
                }
              else if (event.type === HttpEventType.Response) {

                this.xm = JSON.parse(JSON.stringify(event.body));               
                //this.data.name = this.xm.rfcEmisor;
               /* if (this.xm.existe==false)
                {
                    var renglon = this.factXml.filter((it:any) => it.vin == this.xm.vin);
        
                    if (renglon.length == 0) {*/
                    this.factXml.push(this.xm );
                    this.factXml = [...this.factXml];
                  /*  }   
                }   */      
               
                //item.file.name = this.fac.vin;
                //this.message = 'Cargado exitoso.';
                //this.onUploadFinished.emit(event.body);
                //this.imagePath = this.sanitization.bypassSecurityTrustUrl( this.imagePath + this.formValue.value.prD_KEYPRD + '.' + fileToUpload.name.substring(fileToUpload.name.lastIndexOf('.') + 1).toLowerCase());
                //this.imagePath = this.imagePath + this.formValue.value.prD_KEYPRD + '.' + fileToUpload.name.substring(fileToUpload.name.lastIndexOf('.') + 1).toLowerCase();
              }
            });
    
    
      }

      public uploadFile = (files: any) => {
        for (var i = 0; i < files.length; i++) {
          this.Leer(<File>files[i]);
        }
      }   

      seleccionVin(it:any){

      }
  }