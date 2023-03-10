import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesComponent,MasiveTrasladosComponent, TransferenciasComponent,TrasladosDialogComponent,PublicarRedComponent,RegistrarVentaDialogComponent
        ,TransferenciasAceptacionComponent } from './unidades/unidades.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule,MatPaginatorIntl} from '@angular/material/paginator';
import { PaginationPipe } from './pipes/pagination.pipe';
import { NumerosPartePipe } from './pipes/numeros-parte.pipe';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { CapturaVentaComponent } from './capturaVenta/captura-venta.component';
import { ListadoUnidadesPublicadasComponent } from './listado-unidades-publicadas/listado-unidades-publicadas.component';
import { ModelosPipe } from './pipes/modelos.pipe';
import { FileUploadModule } from 'ng2-file-upload';

import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio'; 
import { DialogOverviewExampleDialog } from './../../src/app/capturaVenta/captura-ventaxml.component';
import { ListadoUnidadesDialogComponent,DetalleUnidadDialogComponent } from './navigation/header/header.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { ReporteVentasComponent } from './reporte-ventas/reporte-ventas.component';
import { MatListModule } from '@angular/material/list';
import { UnidadesEntregadasComponent } from './unidades-entregadas/unidades-entregadas.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
    path: 'unidades',
    component: UnidadesComponent,
    children: [
        { 
            path: 'unidades',
            component: UnidadesComponent 
        }
    ]
},   
{
  path: 'capturaventa',
  component: CapturaVentaComponent,
  children: [
      { 
          path: 'capturaventa',
          component: CapturaVentaComponent 
      }
  ]
},   
{
  path: 'listadopublicadas',
  component: ListadoUnidadesPublicadasComponent,
  children: [
      { 
          path: 'listadopublicadas',
          component: ListadoUnidadesPublicadasComponent 
      }
  ]
},
{
  path: 'ReporteVentasentas',
  component: ReporteVentasComponent,
  children: [
      { 
          path: 'ReporteVentasentas',
          component: ReporteVentasComponent 
      }
  ]
},
{
  path: 'UnidadesEntregadas',
  component: UnidadesEntregadasComponent,
  children: [
      { 
          path: 'UnidadesEntregadas',
          component: UnidadesEntregadasComponent 
      }
  ]
},
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UnidadesComponent,
    PaginationPipe,
    NumerosPartePipe,
    CapturaVentaComponent,
    ModelosPipe,
    DialogOverviewExampleDialog,
    MasiveTrasladosComponent,
    TransferenciasComponent,
    TrasladosDialogComponent,
    PublicarRedComponent,
    ListadoUnidadesDialogComponent,
    DetalleUnidadDialogComponent,
    RegistrarVentaDialogComponent,
    ListadoUnidadesPublicadasComponent,
    TransferenciasAceptacionComponent,
    DialogoConfirmacionComponent,
    ReporteVentasComponent,
    SidenavListComponent,
    UnidadesEntregadasComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    SpinnerModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(routes), 
    MatSidenavModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    FileUploadModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatRadioModule,
    MatDialogModule,
    MatListModule
],
exports: [
    MatDialogModule,
    MatSidenavModule 
],
  providers: [{ 
    provide:HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi:true
}],
  bootstrap: [AppComponent],
  
}) 
export class AppModule { }
