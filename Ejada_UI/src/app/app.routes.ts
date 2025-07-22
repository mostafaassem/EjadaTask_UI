import { Routes } from '@angular/router';
import { Home } from './invoice/home/home';
import { InvoiceAdd } from './invoice/invoice-add/invoice-add';
import { InvoiceUpdate } from './invoice/invoice-update/invoice-update';


export const routes: Routes = [
  { path: '', component: Home },
  {path:'AddNewInvoice',component:InvoiceAdd},
  {path:'UpdateInvoice/:id',component:InvoiceUpdate}
];
