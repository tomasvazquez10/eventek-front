import { Component, Input, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service'; // Ajusta la ruta según tu estructura
import { Ticket } from '../../models/event.model'; // Asegúrate de tener este modelo
import { Event } from '../../models/event.model'; // Modelo para el evento

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket!: Ticket; // Recibe los datos del ticket como input
  event!: Event; // Almacena los datos del evento

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    // Cargar el evento basado en el eventId del ticket
    this.ticketService.getEventById(this.ticket.eventId).subscribe(event => {
      this.event = event; // Asigna los datos del evento
    });
  }
}
