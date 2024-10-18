import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventForm: FormGroup;
  eventId: number = 0;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      image: ['', Validators.required],
      tickets: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.eventService.getEventId().subscribe(id => {
      this.eventId = id + 1;
      console.log('Highest Event ID:', this.eventId);
    });
  }

  get tickets(): FormArray {
    return this.eventForm.get('tickets') as FormArray;
  }

  addTicket() {
    const ticketGroup = this.fb.group({
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
    this.tickets.push(ticketGroup);
  }

  removeTicket(index: number) {
    this.tickets.removeAt(index);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.saveEvent(this.eventForm.value).subscribe(event => {
        // Redirigir al evento recién creado
        this.router.navigate(['/event', this.eventId]);
      });
    }
  }
}
