import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-chat-app',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.scss'
})
export class ChatAppComponent implements OnInit {

  messages: string[] = [];
  messageInput: string = '';

  constructor(private chatService: ChatService)
  {
   
  }

  ngOnInit():void
  {
    this.chatService.getMessages().subscribe((message:any)=>{
      this.messages.push(message?.text);
    })
  }     

  sendMessage(){
    this.chatService.sendMessage(this.messageInput);
    this.messageInput ="";
  }
}
