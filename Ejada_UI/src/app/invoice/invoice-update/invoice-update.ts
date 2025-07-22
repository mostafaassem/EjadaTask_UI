import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceApi } from '../../service/invoice-api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-invoice-update',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './invoice-update.html',
  styleUrl: './invoice-update.css'
})
export class InvoiceUpdate implements OnInit {
  updateinvoiceForm!: FormGroup;
  invoiceId! : number ;

  constructor(private fb: FormBuilder
    ,private route: ActivatedRoute,
  private invoiceApi: InvoiceApi,
  private router: Router) {
    


  }
  ngOnInit(): void 
  {
    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));

this.updateinvoiceForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      issueDate: ['', Validators.required],
      totalAmount: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      invoiceDetails: this.fb.array([])
    });



  this.initForm();
    this.loadInvoice();
  }

   initForm(): void {
    this.updateinvoiceForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      issueDate: ['', Validators.required],
      totalAmount: [0, Validators.required],
      invoiceDetails: this.fb.array([])
    });
  }

  get invoiceDetails(): FormArray {
    return this.updateinvoiceForm.get('invoiceDetails') as FormArray;
  }

  createDetail(detail?: any): FormGroup {
    return this.fb.group({
      itemDescription: [detail?.itemDescription || '', Validators.required],
      quantity: [detail?.quantity || 1, Validators.required],
      price: [detail?.price || 0, Validators.required]
    });
  }
   
  
  addDetail(): void {
    this.invoiceDetails.push(this.createDetail());
    this.updateTotal();
  }

   removeDetail(index: number): void {
    this.invoiceDetails.removeAt(index);
    this.updateTotal();
  }

   updateTotal(): void {
    const total = this.invoiceDetails.controls.reduce((sum, ctrl) => {
      const qty = ctrl.get('quantity')?.value || 0;
      const price = ctrl.get('price')?.value || 0;
      return sum + qty * price;
    }, 0);
    this.updateinvoiceForm.get('totalAmount')?.setValue(total);
  }

 loadInvoice(): void {
    this.invoiceApi.getInvoice(this.invoiceId).subscribe(invoice => {
      const issueDate = new Date(invoice.issueDate);
    const formattedDate = issueDate.toISOString().substring(0, 10);
      this.updateinvoiceForm.patchValue({
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.clientName,
        issueDate: formattedDate,
        totalAmount: invoice.totalAmount,
        invoiceDetails:invoice.invoiceDetails
      });

      invoice.invoiceDetails.forEach((detail: any) => {
        this.invoiceDetails.push(this.createDetail(detail));
      });
    });
  }

  
  submitForm(): void {
    if (this.updateinvoiceForm.invalid) return;

    const updatedInvoice = {
      invoiceId: this.invoiceId,
      ...this.updateinvoiceForm.value
    };

    this.invoiceApi.updateInvoice(this.invoiceId, updatedInvoice).subscribe(() => {
      alert('Invoice updated successfully');
      this.router.navigate(['']);
    });
  }
}
