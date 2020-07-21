import { ProfileComponent } from './modules/profile/profile.component';
import { ProjetsComponent } from './modules/projets/projets.component';
import { CollaborateursComponent } from './modules/collaborateurs/collaborateurs.component';
import { LoginComponent } from './modules/login/login.component';
import { TicketComponent } from './modules/ticket/ticket.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
    },{
    path: 'ticket',
    component: TicketComponent,
    },{
      path: 'login',
      component: LoginComponent,
    },{
      path: 'collaborateurs',
      component: CollaborateursComponent,
    },{
      path: 'projets',
      component: ProjetsComponent,
    },{
      path: 'profile',
      component: ProfileComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
