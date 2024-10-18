import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { EventekComponent } from './eventek/eventek.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AdminComponent } from './components/admin/admin.component';
import { SaleComponent } from './components/sale/sale.component';
import { UserComponent } from './components/user/user.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { SwapZoneComponent } from './components/swapzone/swapzone.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { TicketDataComponent } from './components/ticket-data/ticket-data.component';

const routes: Routes = [
  { path: 'event/:id', component: EventComponent },
  { path: 'ticket-data/:id', component: TicketDataComponent },
  { path: 'transfer/:id', component: TransferComponent },
  { path: 'home', component: EventekComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'swapzone', component: SwapZoneComponent }, // Ruta protegida
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'login', component: LoginComponent },
  { path: 'sale/:id', component: SaleComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent }, // Página de acceso denegado
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
