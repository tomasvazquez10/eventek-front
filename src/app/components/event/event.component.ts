import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  //event: Event | undefined;  // Variable para almacenar el evento
  event: Event = {
    id: 1,
    name: 'Summer Music Festival',
    date: '2024-07-15',
    time: '12:00 PM',
    location: 'Central Park, New York',
    image: 'https://placeholder.com/600x400',
    tickets: [
      { type: 'General Admission', price: 50 },
      { type: 'VIP', price: 150 },
      { type: 'Backstage Pass', price: 250 },
    ],
  };

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,  // Para obtener el ID de la URL
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el ID del evento desde la URL
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(eventId);
    if (eventId) {
      this.loadEvent(eventId);
    }
  }

  // Método para obtener el evento desde el servicio por su ID
  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe(
      (data: Event | undefined) => {
        if (data) {
          this.event = data;
        } else {
          console.error('Evento no encontrado');
        }
      },
      error => {
        console.error('Error al cargar el evento', error);
      }
    );
  }

  buyTicket(event: Event): void {
    this.router.navigate(['/sale', event.id]);
  }
}

