import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderCompnent } from './Header/header-compnent/header-compnent';
import { ChatAICompnent } from './Chat/chat-aicompnent/chat-aicompnent';
import { InvoiceModuleModule } from './invoice/invoice-module/invoice-module-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderCompnent,InvoiceModuleModule,ChatAICompnent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ejada_UI');
}
