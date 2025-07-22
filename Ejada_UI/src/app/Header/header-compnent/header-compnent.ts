import { Component } from '@angular/core';
import { ChatToggle } from '../../chat-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-compnent',
  imports: [CommonModule],
  templateUrl: './header-compnent.html',
  styleUrl: './header-compnent.css'
})

export class HeaderCompnent {


  constructor(private chatToggleService: ChatToggle) {}
 toggleChat() {
    this.chatToggleService.toggleChat();
 }

}
