import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';  // Asegúrate de importar la interfaz
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = 'assets/events.json'; // Ruta al archivo JSON
  private apiUrl = 'http://localhost:3000/api/events';
  constructor(private http: HttpClient) { }

  // Método que retorna los eventos como un Observable
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Método para obtener un evento por su ID
  getEventById(id: number): Observable<any> {
    return this.http.get<any[]>(this.eventsUrl).pipe(
      map(events => events.find(event => event.id === id)) // Filtra la venta por ID
    );
  }

  getEventId(): Observable<number> {
    return this.getEvents().pipe(
      map((events: Event[]) => {
        if (events.length === 0) {
          return 0; // Si no hay ventas, devolver 0
        }

        // Buscar el ID más alto
        const maxId = Math.max(...events.map(event => event.id));
        return maxId;
      })
    );
  }

  saveEvent(event: Event): Observable<any> {
    return this.getEventId().pipe(
      // Sumamos 1 al ID más alto y se lo asignamos al nuevo evento
      map(maxId => {
        event.id = maxId + 1;
        return event;
      }),
      // Luego hacemos el post para guardarlo
      switchMap(newEvent => this.http.post(this.apiUrl, newEvent))
    );
  }
  
}

