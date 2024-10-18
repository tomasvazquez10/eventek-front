import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/event.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private salesUrl = 'assets/sales.json'; // Ruta al archivo JSON de ventas
  private apiUrl = 'http://localhost:3000/api/sales';

  constructor(private http: HttpClient) {}

  // Método para leer las ventas desde el archivo JSON
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  // Método para simular la escritura de una venta en localStorage
  saveSale(sale: Sale): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("sale");
    console.log(sale);
    return this.http.post(this.apiUrl, sale);
  }

  // Obtener las ventas guardadas en localStorage
  private getLocalSales(): Sale[] {
    const sales = localStorage.getItem('sales');
    return sales ? JSON.parse(sales) : [];
  }

  // Método para obtener el ID más alto de las ventas
  getSaleId(): Observable<number> {
    return this.getSales().pipe(
      map((sales: Sale[]) => {
        if (sales.length === 0) {
          return 0; // Si no hay ventas, devolver 0
        }

        // Buscar el ID más alto
        const maxId = Math.max(...sales.map(sale => sale.id));
        return maxId;
      })
    );
  }

  // Método para obtener una venta por su ID
  getSaleById(saleId: number): Observable<any> {
    return this.http.get<any[]>(this.salesUrl).pipe(
      map(sales => sales.find(sale => sale.id === saleId)) // Filtra la venta por ID
    );
  }
}
