import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ticket } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsUrl = 'assets/tickets.json'; // Ruta a tu archivo JSON o API
  private eventsUrl = 'assets/events.json';
  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) {}

  getTicketsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(this.ticketsUrl).pipe(
      // Filtrar los tickets por username
      map(tickets => tickets.filter(ticket => ticket.username === username)),
      // Por cada ticket, obtener el evento asociado usando el eventId
      switchMap(tickets => {
        const eventRequests = tickets.map(ticket => this.getEventById(ticket.eventId).pipe(
          map(event => ({ ...ticket, event }))  // Combinar ticket con su evento
        ));
        return forkJoin(eventRequests);  // Ejecutar todas las solicitudes de eventos
      })
    );
  }

  // Método para obtener un evento por su ID
  getEventById(id: number): Observable<any> {
    return this.http.get<any[]>(this.eventsUrl).pipe(
      map(events => events.find(event => event.id === id)) 
    );
  }

  getTicketById(id: number): Observable<any> {
    return this.http.get<any[]>(this.ticketsUrl).pipe(
      map(tickets => tickets.find(ticket => ticket.id === id)) 
    );
  }

  getAllUsernames(): Observable<string[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => users.map(user => user.username)) // Extrae solo los usernames
    );
  }

  transferTicket(ticketId: number, newUsername: string): Observable<any> {
    return this.http.put(`${this.ticketsUrl}/${ticketId}`, { username: newUsername });
  }

  getSwapZoneTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.ticketsUrl).pipe(
      // Filtrar los tickets por username
      map(tickets => tickets.filter(ticket => ticket.state === 'swapzone')),
      // Por cada ticket, obtener el evento asociado usando el eventId
      switchMap(tickets => {
        const eventRequests = tickets.map(ticket => this.getEventById(ticket.eventId).pipe(
          map(event => ({ ...ticket, event }))  // Combinar ticket con su evento
        ));
        return forkJoin(eventRequests);  // Ejecutar todas las solicitudes de eventos
      })
    );
  }
}
