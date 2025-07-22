import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApi {
  private apiUrl = 'https://localhost:44397/api/Invoices'; 
  private ChatAPI='https://localhost:44397/api/SqlAI'

constructor(private http: HttpClient) {}

getInvoices(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAll`);
  }

  deleteInvoice(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

updateInvoice(id: number, invoiceData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, invoiceData);
}

getInvoice(id:number):Observable<any>{
  return  this.http.get(`${this.apiUrl}/${id}`);
}

addInvoice(invoice: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, invoice);
}

SendChat(Request:any):Observable<any>
{
  return this.http.post(`${this.ChatAPI}/ChatAI`, Request,{responseType: 'text'} );
}
}
