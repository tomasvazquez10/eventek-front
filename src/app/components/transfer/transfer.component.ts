import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/event.model';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  ticket: Ticket | undefined;
  usernames: string[] = []; // Lista de usuarios disponibles para transferir
  selectedUsername: string = ''; // Usuario seleccionado
  ticketId: number | null = null;
  event!: Event | null; // Almacena los datos del evento

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Obtener el ID del ticket de la URL
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.getEventById(this.ticketId).subscribe(event => {
      this.event = event; // Asigna los datos del evento
    });
    
    if (this.ticketId) {
      this.loadTicket(this.ticketId);
    }

    // Obtener todos los usernames para la transferencia
    this.loadUsernames();
  }

  loadTicket(ticketId: number): void {
    this.ticketService.getTicketById(ticketId).subscribe(
      (data: Ticket) => {
        this.ticket = data;
      },
      error => {
        console.error('Error al cargar el ticket', error);
      }
    );
  }

  loadUsernames(): void {
    this.ticketService.getAllUsernames().subscribe(
      (data: string[]) => {
        this.usernames = data;
      },
      error => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  transferTicket(): void {
    if (this.ticket && this.selectedUsername) {
      this.ticketService.transferTicket(this.ticket.id, this.selectedUsername).subscribe(
        () => {
          console.log('Ticket transferido exitosamente');
        },
        error => {
          console.error('Error al transferir el ticket', error);
        }
      );
    }
  }
}
