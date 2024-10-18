import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';  // Asegúrate de importar la interfaz
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsUrl = 'assets/events.json'; // Ruta al archivo JSON
  constructor(private http: HttpClient) { }

  // Método que retorna los eventos como un Observable
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  // Método para obtener un evento por su ID
  getEventById(id: number): Observable<any> {
    return this.http.get<any[]>(this.eventsUrl).pipe(
      map(events => events.find(event => event.id === id)) // Filtra la venta por ID
    );
  }
}

