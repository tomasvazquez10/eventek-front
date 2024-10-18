import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, Sale, Ticket } from '../../models/event.model';
import { SaleService } from '../../services/sale.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  event: Event | undefined;
  ticketQuantities: { [key: string]: number } = {}; // Objeto para guardar las cantidades por tipo de ticket
  tickets: Ticket[] = [];
  totalPrice: number = 0;
  saleId: number = 0;
  username: string = '';

  constructor(
    private eventService: EventService,
    private saleService: SaleService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    if (eventId) {
      this.loadEvent(eventId);
    }

    this.saleService.getSaleId().subscribe(id => {
      this.saleId = id;
      console.log('Highest Sale ID:', this.saleId);
    });

    this.username = this.authService.getUsername() ?? '';
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe(
      (data: Event | undefined) => {
        this.event = data;

        // Inicializa las cantidades de tickets a 0
        if (this.event) {
          this.event.tickets.forEach(ticket => {
            this.ticketQuantities[ticket.type] = 0; // Inicializa la cantidad a 0
          });
        }
        this.calculateTotalPrice(); // Calcula el precio total inicial
      },
      error => {
        console.error('Error al cargar el evento', error);
      }
    );
  }

  onQuantityChange(ticketType: string): void {
    this.calculateTotalPrice(); // Calcula el precio total cuando cambian las cantidades
  }

  calculateTotalPrice(): void {
    this.totalPrice = 0;

    // Calcula el total basado en las cantidades seleccionadas
    if (this.event) {
      this.event.tickets.forEach(ticket => {
        const quantity = this.ticketQuantities[ticket.type] || 0; // Obtiene la cantidad
        this.totalPrice += ticket.price * quantity; // Suma al total
      });
    }
  }

  confirmPurchase(): void {
    this.createTickets();
    const newSale: Sale = {
      "id": this.saleId + 1, // Asignar un nuevo ID basado en el ID más alto
      "username": this.username,
      "tickets": this.tickets,
      "totalPrice": this.totalPrice,
      "date": "",
    };

    this.saleService.saveSale(newSale);
    console.log(`Total Purchase: $${this.totalPrice}`);

    // Redirigir o mostrar un mensaje de confirmación
    this.router.navigate(['/confirmation']); // Cambia esto a tu ruta de confirmación
  }

  createTickets(): void {
    if (this.event) {
      const eventId = this.event.id || 0;
      this.event.tickets.forEach(ticket => {
        const newTicket: Ticket = {
          "id": 1,
          "type": ticket.type,
          "price": ticket.price,
          "active": true,
          "username": this.username,
          "eventId": eventId,
          "state": ""
        }
        this.tickets.fill(newTicket);
      });
    }
  }

}