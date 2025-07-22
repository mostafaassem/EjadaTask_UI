import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ChatToggle {
 
  private showChatSource = new BehaviorSubject<boolean>(false);
  showChat$ = this.showChatSource.asObservable();

  toggleChat() {
    const current = this.showChatSource.getValue();
    this.showChatSource.next(!current);
  }

  setChatVisibility(visible: boolean) {
    this.showChatSource.next(visible);
  }

  
}
