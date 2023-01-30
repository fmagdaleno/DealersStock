import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { ComunService } from '../services/comun.service';
import { DialogOverviewExampleDialog } from './captura-ventaxml.component';

const URL = 'http://localhost:44348/api/Facturas/LeerXML';

export interface DialogData {
  animal: string;
  name: string;
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
  cD_PEDIDO: string = '';
  nB_MODELO: string = '';
  cD_CLASIFCORP: string = '';
  nB_CLASIFCORP: string = '';
  idDealer: string = '';
  tX_TIPO_FLOTILLA: string = '';
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Tipos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-captura-venta',
  templateUrl: './captura-venta.component.html',
  styleUrls: ['./captura-venta.component.css']
})

export class CapturaVentaComponent implements OnInit {
    emailFormControl = new FormControl('', [Validators.required,Validators.email,]);
    rfcReceptorFrmCtl = new FormControl('', [Validators.required,]);
    contactoFrmCtl = new FormControl('', [Validators.required,]);
    telfijoFrmCtl = new FormControl('', [Validators.required,]);
    telmovFrmCtl = new FormControl('', [Validators.required,]);
    tipCliFormControl = new FormControl('', [Validators.required,]);
    rolFormControl = new FormControl('', [Validators.required,]);
    puestoFormControl = new FormControl('', [Validators.required,]);
    razonFormControl = new FormControl('', [Validators.required,]);
    cpFormControl = new FormControl('', [Validators.required,]);
    domFormControl = new FormControl('', [Validators.required,]);
    edoFormControl = new FormControl('', [Validators.required,]);
    ciuFormControl = new FormControl('', [Validators.required,]);
    aplFormControl = new FormControl('', [Validators.required,]);
    tipVenFormControl = new FormControl('', [Validators.required,]);
    venFormControl = new FormControl('', [Validators.required,]);
    obserFormControl = new FormControl('', [Validators.required,]);
    tipoFinFormControl = new FormControl('', [Validators.required,]);
    entiFinanFormControl = new FormControl('', [Validators.required,]);
    fecEstFormControl = new FormControl('', [Validators.required,]);
    fecDTUFormControl = new FormControl('', [Validators.required,]);
    odoFormControl = new FormControl('', [Validators.required,]);
    
    startDate = new Date();
    xm: Xml = new Xml();
    aplOtr:  string = '';
    otra:  string = '';
    valido: boolean=false;
    fecEst = new Date();
    fecDTU = new Date();
    bFinan: boolean=false;
    ntUser: any = window[<any>'varGlobal_User'];
    bCyt: boolean=false;
    tipcli: number = 0;

    listTipoCli: any[] = [];
    listTipoFinan: any[] = [];
    listVende: any[] = [];
    listApli: any[] = [];
    listRoles: any[] = [];
    listSuc: any[] = [];
    listClas: any[] = [];
    listEstado: any[] = [];
    listCiudades: any[] = [];
    listEntiFinan: any[] = [];
    cli !: any;

    selectedSuc: number = 0;
    selectedRol: number = 0;
    selectedApl: number = 0;
    selectedVta: number = 0;
    selectedVen: number = 0;
    selectedLoc: number = 0;
    selectedEntFin: number = 0;
    selectedTipcl: number = 0;
    selectededo: number = 0;
    selectedFinan: string = "2";
    selectedTipoFin: number = 0;

    roles: Tipos[] = [
      {value: '0', viewValue: 'Rol 1'},
      {value: '1', viewValue: 'Rol 2'},
      {value: '2', viewValue: 'Rol 3'}
    ];

  matcher = new MyErrorStateMatcher();

  constructor(public dialog: MatDialog, public comunSrv: ComunService) { }

  ngOnInit(): void {
    this.startDate = new Date();   
    this.fecEstFormControl.setValue(this.startDate);  
    this.getTipoClientes();
    this.getTipoFinanciamiento();
    this.getVendedores();
    this.getRoles();
    //this.getSucursales();
    this.getFlotasCla();
    this.getEstados();
    this.getEntidadFinan();
    this.onFinanChange();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1750px', height: '650px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bCyt = false;
      if(result!=undefined){
        this.cancelar();
        this.xm = result;
        this.bCyt = this.xm.vin.toUpperCase().startsWith('3J');
        this.rfcReceptorFrmCtl.setValue(this.xm.rfcReceptor);
        this.razonFormControl.setValue(this.xm.nombreReceptor);
        this.getSucursales();
        this.getCli();
        this.tipcli = Number(this.xm.cD_CLASIFCORP);
        this.getTipoClientes();
        const [day, month, year] = this.xm.fecha.split('/');
        this.startDate = new Date(+year, +month - 1, +day);
        //this.fecEst = new Date(+year, +month - 1, +day);
        this.fecEstFormControl.setValue(this.startDate );
      }
    });
  }
  
  
  getTipoClientes(): void{
    this.listTipoCli = [];
  this.comunSrv.get('/tipoclientes/filtrada/' + this.tipcli)
  .subscribe((_Clases:any[]) => {
    this.listTipoCli = _Clases 
    });
  }
  
  changeCli(event:any)
  {
    if(event.isUserInput) {
      this.selectedTipcl = event.source.value;
      this.getAplicacion();
    }
  }

  getTipoFinanciamiento(): void{
  this.comunSrv.get('/tipoFinanciamientoes')
  .subscribe((_Clases:any[]) => {
    this.listTipoFinan = _Clases 
    });
  }

  getVendedores(): void{
    this.comunSrv.get('/vendedores')
    .subscribe((_Clases:any[]) => {
      this.listVende = _Clases 
      });
    }

    getAplicacion(): void{
      this.comunSrv.get('/vendedores/Aplicacion/' + this.selectedTipcl)
      .subscribe((_Clases:any[]) => {
        this.listApli = _Clases 
        });
      }
    getRoles(): void{
      this.comunSrv.get('/vendedores/Roles')
      .subscribe((_Clases:any[]) => {
        this.listRoles = _Clases 
        });
      }

      getSucursales(): void{
        this.comunSrv.get('/vendedores/Sucursales/' + this.xm.idDealer)
        .subscribe((_Clases:any[]) => {
          this.listSuc = _Clases 
          });
      }

      getFlotasCla(): void{
        this.comunSrv.get('/vendedores/flotascla')
        .subscribe((_Clases:any[]) => {
          this.listClas = _Clases 
          });
      }

      getCli(): void{
        this.comunSrv.get('/vendedores/clientesobtiene/' + this.xm.rfcReceptor)
        .subscribe((_Clases:any[]) => {
          this.cli = _Clases 
          this.contactoFrmCtl.setValue(this.cli.tx_nombrecliente);
          this.telfijoFrmCtl.setValue(this.cli.nu_telefonoFijo);
          this.telmovFrmCtl.setValue(this.cli.nu_telefonoMovil);
          this.cpFormControl.setValue(this.cli.nu_cp);
          this.domFormControl.setValue(this.cli.tx_direccion);
          this.selectedTipcl = this.cli.id_TipoCliente;
          this.emailFormControl.setValue(this.cli.tx_email);
          this.selectededo = this.cli.id_estado;
          this.getAplicacion();
          this.getCiudades();
          this.selectedLoc = this.cli.id_asentamiento;
          });
      }

      getEstados(): void{
        this.comunSrv.get('/vendedores/Estados')
        .subscribe((_Clases:any[]) => {
          this.listEstado = _Clases 
          });
      }

      getCiudades(): void{
        this.comunSrv.get('/vendedores/ciudades/' + this.selectededo)
        .subscribe((_Clases:any[]) => {
          this.listCiudades = _Clases 
          });
      }

      getCiudadesCp(): void{
        this.comunSrv.get('/vendedores/CiudadesCP/' + this.cpFormControl.value)
        .subscribe((_Clases:any[]) => {
            var ciudCP = _Clases 
            if(ciudCP.length > 0)
            {                        
               this.selectededo = ciudCP[0].id_entidadf;
               this.getCiudades();
               this.selectedLoc = ciudCP[0].id_municipio;
            }
          });
      }

      getEntidadFinan(): void{
        this.comunSrv.get('/vendedores/entidadesfinan')
        .subscribe((_Clases:any[]) => {
            this.listEntiFinan = _Clases 
          });
      }

      changeEdo(event:any)
      {
        if(event.isUserInput) {
          this.selectededo = event.source.value;
          this.getCiudades();
        }
      }

      cpEnter(event:any) {
        if(this.cpFormControl.value != null)
        {
          this.getCiudadesCp();
        }
      }

    cancelar(){
      this.xm = new Xml();
      this.startDate = new Date();   
      this.fecEstFormControl.setValue(this.startDate);   
      this.rfcReceptorFrmCtl.reset();
      this.emailFormControl.reset();
      this.contactoFrmCtl.reset();
      this.telfijoFrmCtl.reset();
      this.telmovFrmCtl.reset();
      this.puestoFormControl.reset();
      this.razonFormControl.reset();
      this.cpFormControl.reset();
      this.domFormControl.reset();
      this.aplOtr = '';
      this.obserFormControl.reset();
      this.tipCliFormControl.reset();
      this.rolFormControl.reset();
      this.edoFormControl.reset(); 
      this.ciuFormControl.reset();
      this.aplFormControl.reset();
      this.tipVenFormControl.reset();
      this.venFormControl.reset();
      this.tipoFinFormControl.reset();
      
      this.otra = '';
      this.selectedSuc=0;
      this.selectedLoc=0;
      this.selectedApl=0;
      this.selectedVen=0;
      this.selectedVta=0;
      this.selectedEntFin=0;
      this.selectedRol=0;
      this.selectedTipcl=0;
      this.selectededo=0;
      this.selectedLoc=0;
      this.selectedFinan="2";

      this.selectedTipoFin = 0;
      this.bCyt = false;
      this.odoFormControl.reset();
      this.fecDTUFormControl.setValue(this.startDate);  
      this.tipcli = 0;
this.getTipoClientes();
      this.onFinanChange();
    }

    guardar(){
      this.validar();

      if(this.valido){
        var vta: any = {};
        vta.strVIN = this.xm.vin;
        vta.idPlaza = this.selectedSuc;
        vta.idLocalidad = Number(this.selectedLoc);
        vta.clienteFinal = this.razonFormControl.value;
        vta.fchDeVenta = this.startDate;
        vta.tipoDeSalida = 1;
        vta.cancelado = 0;
        vta.idAplicacion = this.selectedApl;
        vta.id_Vendedor = this.selectedVen;
        vta.idDealer = Number(this.xm.idDealer);
        vta.cd_clasflotas = this.selectedVta;
        vta.id_cliente = 0;
        vta.id_TipoFinanciamiento = Number(this.selectedTipoFin);
        vta.tx_AppOtra = this.aplOtr;
        vta.strUsuario = this.ntUser;
        vta.intIdStatusNuevo = 4;
        vta.intIdStatusAnterior = 1
        vta.strComentarios = this.obserFormControl.value;
        vta.cd_Rol = this.selectedRol;
        vta.puesto =  this.puestoFormControl.value;
        vta.UID = this.xm.uuid;
        vta.esFinan = (this.selectedFinan=='1');
        vta.idfinan = 0;
        vta.fchFinan = this.fecEstFormControl.value;
        vta.pedido = this.xm.cD_PEDIDO;
        vta.tipoPedido = this.xm.tX_TIPO_FLOTILLA;
        vta.modelo = this.xm.nB_MODELO;
        vta.clasCorp = this.xm.nB_CLASIFCORP;

        if(this.selectedFinan=='1')
        {
          vta.idfinan = this.selectedEntFin;
        }
        vta.esDTU = this.bCyt;
        vta.Odometro = 0;
        if(this.bCyt){
          vta.Odometro = this.odoFormControl.value;
          vta.FchDTU = this.fecDTUFormControl.value;
        }

        var cte: any = {};
        cte.id_cliente =0;
        cte.id_gfx=Number(this.xm.idDealer);
        cte.tx_nombrecliente = this.contactoFrmCtl.value; 
        cte.nu_telefonoFijo = this.telfijoFrmCtl.value;
        cte.nu_telefonoMovil= this.telmovFrmCtl.value;
        cte.tx_email = this.emailFormControl.value;
        cte.id_TipoCliente = this.selectedTipcl;
        cte.nu_cp=this.cpFormControl.value.toString();
        cte.id_estado= Number(this.selectededo);
        cte.id_asentamiento = Number(this.selectedLoc);
        cte.tx_direccion = this.domFormControl.value;
        cte.cd_userAlta = this.ntUser; 
        cte.tx_cliente = this.razonFormControl.value;
        cte.tx_rfc = this.rfcReceptorFrmCtl.value;
        cte.idLocalidad  = this.selectedSuc;
        cte.nu_ExtensionTelefono ='';
        vta.cliente  = cte;

        this.comunSrv.post('/vendedores/GuardaVenta', vta)
        .subscribe((_Clases:any[]) => {
            var res = _Clases 

            if (res.toString()=='1')
            {
                this.cancelar();
                alert('Se guardo correctamente la venta');
            }
            else
            {
                alert('Ocurrio un error al guardar la venta');
            }
          });
      }
    }

    onFinanChange()
    {
      if(this.selectedFinan=='2')
      {
        this.otra='';
        this.selectedTipoFin = 0;
        this.tipoFinFormControl.disable();
        this.entiFinanFormControl.disable();
        this.tipoFinFormControl.reset();
        this.entiFinanFormControl.reset();
        this.fecEstFormControl.reset();
        this.selectedEntFin = 0;
        this.fecEstFormControl.setValue(this.startDate );
        this.bFinan=true;
      }
      else{      
        this.tipoFinFormControl.enable();
        this.entiFinanFormControl.enable();
        this.bFinan=false;
      }
    }

  validar()
  {
    this.valido=true;
    if(!this.rfcReceptorFrmCtl.valid)
    {
      this.rfcReceptorFrmCtl.markAllAsTouched();
      this.valido=false;
    }    
    if(!this.contactoFrmCtl.valid)
    {
      this.contactoFrmCtl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.emailFormControl.valid)
    {
      this.emailFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.telfijoFrmCtl.valid)
    {
      this.telfijoFrmCtl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.telmovFrmCtl.valid)
    {
      this.telmovFrmCtl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.tipCliFormControl.valid)
    {
      this.tipCliFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.rolFormControl.valid)
    {
      this.rolFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.puestoFormControl.valid)
    {
      this.puestoFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.razonFormControl.valid)
    {
      this.razonFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.cpFormControl.valid)
    {
      this.cpFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.edoFormControl.valid)
    {
      this.edoFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.ciuFormControl.valid)
    {
      this.ciuFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.domFormControl.valid)
    {
      this.domFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.aplFormControl.valid)
    {
      this.aplFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.tipVenFormControl.valid)
    {
      this.tipVenFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.venFormControl.valid)
    {
      this.venFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.obserFormControl.valid)
    {
      this.obserFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(!this.obserFormControl.valid)
    {
      this.obserFormControl.markAllAsTouched();
      this.valido=false;
    }
    if(this.selectedFinan=='1')
    {
      if(!this.tipoFinFormControl.valid)
      {
        this.tipoFinFormControl.markAllAsTouched();
        this.valido=false;
      }
      if(!this.entiFinanFormControl.valid)
      {
        this.entiFinanFormControl.markAllAsTouched();
        this.valido=false;
      }
      if(!this.fecEstFormControl.valid)
      {
        this.fecEstFormControl.markAllAsTouched();
        this.valido=false;
      }
    }
    if(this.bCyt)
    {
      if(!this.odoFormControl.valid)
      {
        this.odoFormControl.markAllAsTouched();
        this.valido=false;
      }
      if(!this.fecDTUFormControl.valid)
      {
        this.fecDTUFormControl.markAllAsTouched();
        this.valido=false;
      }
    }
  }
}

