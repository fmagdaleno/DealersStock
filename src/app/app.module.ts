import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SpinnerModule } from './shared/components/spinner/spinner.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesComponent,TrasladosDialogComponent } from './unidades/unidades.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
//import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
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
import { ModelosPipe } from './pipes/modelos.pipe';
import { MatDialogModule } from '@angular/material/dialog';




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
    TrasladosDialogComponent

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
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
],
  providers: [{ 
    provide:HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi:true
}],
  bootstrap: [AppComponent],
  
}) 
export class AppModule { }
