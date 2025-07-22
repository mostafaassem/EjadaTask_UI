import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceApi } from '../../service/invoice-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-add',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './invoice-add.html',
  styleUrl: './invoice-add.css'
})
export class InvoiceAdd implements OnInit {
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder,private invoiceApi: InvoiceApi,private router: Router) {
    this.invoiceForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      issueDate: ['', Validators.required],
      totalAmount: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      invoiceDetails: this.fb.array([])
    });
  }
  ngOnInit(): void 
  {
    this.addDetail(); 
  }

  get invoiceDetails(): FormArray {
    return this.invoiceForm.get('invoiceDetails') as FormArray;
  }

   addDetail(): void {
    const detailGroup = this.fb.group({
      itemDescription: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    this.invoiceDetails.push(detailGroup);
  }

   removeDetail(index: number): void {
    this.invoiceDetails.removeAt(index);
    this.updateTotalAmount()
  }

  updateTotalAmount(): void {
    const total = this.invoiceDetails.controls.reduce((sum, control) => {
      const quantity = control.get('quantity')?.value || 0;
      const price = control.get('price')?.value || 0;
      return sum + quantity * price;
    }, 0);
    this.invoiceForm.get('totalAmount')?.setValue(total);
  }
  submitForm(): void {
    if (this.invoiceForm.invalid) return;

    this.invoiceApi.addInvoice(this.invoiceForm.value).subscribe(() => {
      alert('Invoice added successfully');
      this.router.navigate(['']);
    });
  }
}
