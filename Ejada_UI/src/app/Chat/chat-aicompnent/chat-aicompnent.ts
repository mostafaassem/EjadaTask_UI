import { Component } from '@angular/core';
import { ChatToggle } from '../../chat-toggle';
import { CommonModule } from '@angular/common';
import { InvoiceApi } from '../../service/invoice-api';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
@Component({
  selector: 'app-chat-aicompnent',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-aicompnent.html',
  styleUrl: './chat-aicompnent.css'
})
export class ChatAICompnent  {
showChat = false;
Message :string='';
Request:any={
  prompt:''
}
loading: boolean = false;
Response:string='';
constructor(private chatToggleService: ChatToggle,private invoiceApi: InvoiceApi) {}

ngOnInit() {
    this.chatToggleService.showChat$.subscribe((visible) => {
      this.showChat = visible;
    });
  }

  SendChat()
  {

    this.loading = true;         
    this.Response = ''; 
    this.Request.prompt=this.Message;
    this.Message='';
    this.invoiceApi.SendChat(this.Request).subscribe(
    {
        next: (res: any) => {
          this.Response = res;
          this.loading=false;
           console.log('رد السيرفر:', res);
        },
        
      }
    )
  }


}
