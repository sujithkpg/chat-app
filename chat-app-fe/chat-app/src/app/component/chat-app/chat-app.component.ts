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
  messages: Message[] = [];
  messageContent: string = '';
  recipient: string = '';
  sender: string = 'user1'; // Example sender, replace with the actual sender


  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Establish WebSocket connection
    this.chatService.connect();

    // Subscribe to incoming messages
    this.chatService.getMessages().subscribe((message:any) => {
      this.messages.push(message); // Add incoming message to the list
    });
  }

  // Send a message to a specific recipient
  sendMessage(): void {
    const message: Message = {
      sender: this.sender,
      recipient: this.recipient,
      content: this.messageContent,
    };
    this.chatService.sendMessage(message); // Send message through WebSocket
    this.messageContent = ''; // Clear message input
  }

  // Broadcast a message to all clients
  broadcastMessage(): void {
    const message: Message = {
      sender: this.sender,
      recipient: 'all', // Broadcasting to all
      content: this.messageContent,
    };
    this.chatService.broadcastMessage(message); // Broadcast message
    this.messageContent = ''; // Clear message input
  }

}

export interface Message {
  sender: string;
  recipient: string;
  content: string;
}