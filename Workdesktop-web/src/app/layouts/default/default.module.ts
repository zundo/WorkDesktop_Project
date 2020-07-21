import { LoginComponent } from '../../modules/login/login.component';
import { CollaborateursComponent } from '../../modules/collaborateurs/collaborateurs.component';
import { ProjetsComponent } from '../../modules/projets/projets.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from './../../modules/dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from './../../shared/shared.module';
import { TicketComponent } from './../../modules/ticket/ticket.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './../../modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    TicketComponent,
    ProjetsComponent,
    CollaborateursComponent,
    LoginComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SharedModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
