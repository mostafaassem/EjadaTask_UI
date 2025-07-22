import { Component } from '@angular/core';
import { ChatToggle } from '../../chat-toggle';
import { CommonModule } from '@angular/common';
import { InvoiceApi } from '../../service/invoice-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-aicompnent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-aicompnent.html',
  styleUrl: './chat-aicompnent.css'
})
export class ChatAICompnent {
  showChat = false;
  Message: string = '';
  loading: boolean = false;

  // Chat history: each item { sender: 'user' | 'ai', text: string }
  chatHistory: { sender: string; text: string }[] = [];

  constructor(private chatToggleService: ChatToggle, private invoiceApi: InvoiceApi) {}

  ngOnInit() {
    this.chatToggleService.showChat$.subscribe((visible) => {
      this.showChat = visible;
    });
  }

  SendChat() {
    if (!this.Message.trim()) return;

    const userMessage = this.Message;
    this.chatHistory.push({ sender: 'user', text: userMessage });

    this.loading = true;
    this.Message = '';

    this.invoiceApi.SendChat({ prompt: userMessage }).subscribe({
      next: (res: any) => {
        this.chatHistory.push({ sender: 'ai', text: res });
        this.loading = false;
        console.log('رد السيرفر:', res);
      },
      error: () => {
        this.chatHistory.push({ sender: 'ai', text: 'حدث خطأ في السيرفر. حاول مرة أخرى.' });
        this.loading = false;
      }
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.SendChat();
    }
  }
}