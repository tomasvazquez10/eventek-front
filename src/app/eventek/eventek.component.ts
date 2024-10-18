import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from '../services/event.service';

interface Ticket {
  type: string;
  price: number;
}

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  image: string;
  tickets: Ticket[];
}

@Component({
  selector: 'app-eventek',
  templateUrl: './eventek.component.html',
  styleUrls: ['./eventek.component.css']
})
export class EventekComponent implements OnInit {
  events: Event[] = [];

  searchText: string = '';

  constructor(private snackBar: MatSnackBar, private eventService: EventService, private router: Router,) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: Event[]) => {
        this.events = data;  // Almacena los eventos
      },
      (error) => {
        console.error('Error al cargar los eventos', error);
      }
    );
  }

  buyTicket(event: Event): void {
    this.router.navigate(['/sale', event.id]);
  }

  search(): void {
    this.snackBar.open(`Searching for: ${this.searchText}`, 'Close', {
      duration: 3000,
    });
    // Implement search logic here
  }

  listTicket(): void {
    this.snackBar.open('Listing ticket for swap', 'Close', {
      duration: 3000,
    });
    // Implement ticket listing logic here
  }
}
