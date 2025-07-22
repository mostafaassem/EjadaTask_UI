import { Component, OnInit } from '@angular/core';
import {InvoiceApi} from '../../service/invoice-api'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceAPI:InvoiceApi,private router:Router){}
  ngOnInit(): void {
    this.invoiceAPI.getInvoices().subscribe(
      data=>
      {
        this.invoices=data;
      }
    )
  }



    onUpdate(id: number) {
   this.router.navigate(['/UpdateInvoice', id]);
}


onDelete(id: number) 
{
 if (confirm('Are you sure you want to delete this invoice?')) {
    this.invoiceAPI.deleteInvoice(id).subscribe({
      next: () => {
        
        this.invoices = this.invoices.filter(inv => inv.invoiceId !== id);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Delete failed. Please try again.');
      }
    });
}
}

}
