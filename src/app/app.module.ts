import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventekComponent } from './eventek/eventek.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { EventComponent } from './components/event/event.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AdminComponent } from './components/admin/admin.component';
import { SaleComponent } from './components/sale/sale.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SaleService } from './services/sale.service';
import { EventService } from './services/event.service';
import { UserComponent } from './components/user/user.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { SwapZoneComponent } from './components/swapzone/swapzone.component';
import { TicketDataComponent } from './components/ticket-data/ticket-data.component';


@NgModule({
  declarations: [
    AppComponent,
    EventekComponent,
    EventComponent,
    LoginComponent,
    NotAuthorizedComponent,
    AdminComponent,
    SaleComponent,
    ToolbarComponent,
    UserComponent,
    TicketComponent,
    TransferComponent,
    SwapZoneComponent,
    TicketDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [
    AuthService, 
    SaleService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
