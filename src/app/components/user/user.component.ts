import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket.service'; // Asumiendo que tienes un servicio para obtener tickets

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string | null = '';
  tickets: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
  
    if (this.username) {
      this.loadTickets(this.username);
    }
  }
  
  loadTickets(username: string): void {
    this.ticketService.getTicketsByUsername(username).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }
  
}
