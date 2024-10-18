export interface Sale {
  id: number;
  username: string;
  tickets: Ticket[];
  totalPrice: number;
  date: string;
}

export interface Ticket {
  id: number;
  price: number;
  username: string;
  active: boolean;
  type: string;
  eventId: number;
  state: string;
}
export interface User {
  username: string;
  password: string;
  role: string;
}

export interface EventTicket {
    type: string;
    price: number;
}
  
export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    location: string;
    image: string;
    tickets: EventTicket[];
}

export interface ReSale {
  id: number;
  finalPrice: number;
  date: string;
  buyer: User;
  seller: User;
}

export interface TicketData {
  id: number;
  qr:  string;
  nft: string;
}

