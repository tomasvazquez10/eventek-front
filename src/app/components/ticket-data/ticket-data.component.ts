import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event.model'; // Modelo para el evento
import { Ticket } from '../../models/event.model';

@Component({
  selector: 'app-ticket-data',
  templateUrl: './ticket-data.component.html',
  styleUrls: ['./ticket-data.component.css']
})
export class TicketDataComponent implements OnInit {
  ticket!: Ticket | null;
  event!: Event | null;
  ticketId = 0;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(this.ticketId);
  }

  loadData(ticketId: number): void {
    if (this.ticketId) {
      this.ticketService.getEventById(this.ticketId ).subscribe(event => {
        this.event = event;
      });
    }
    this.ticketService.getTicketById(this.ticketId).subscribe(ticket => {
      this.ticket = ticket;
    });
  }
}
