import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/event.model'; // Importa el modelo

@Component({
  selector: 'app-swapzone',
  templateUrl: './swapzone.component.html',
  styleUrls: ['./swapzone.component.css']
})
export class SwapZoneComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getSwapZoneTickets().subscribe((tickets) => {
      this.tickets = tickets;
      console.log(this.tickets);
    });
    
  }
}
