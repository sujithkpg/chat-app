import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'; 
import { AppHighlite } from '../../directive/AppHighlight';
import { CapsText } from '../../pipe/CapsText';

@Component({
  selector: 'app-chat-app',
  standalone: true,
  imports: [FormsModule,CommonModule,AppHighlite,CapsText],
  templateUrl: './chat-app.component.html',
  styleUrl: './chat-app.component.scss'
})
export class ChatAppComponent implements OnInit {
  users = [
    { name: 'User1' },
    { name: 'User2' },
    { name: 'User3' }
  ];
  
  selectedUser: any = null;  // To store selected user
  selectedUserMessages: Message[] = []; // To store messages for the selected user
  messageContent: string = ''; // User's input message

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Establish WebSocket connection
    this.chatService.connect();

    // Listen for incoming messages
    this.chatService.getMessages().subscribe((message: Message) => {
      if (this.selectedUser && this.selectedUser.name === message.sender) {
        this.selectedUserMessages.push(message);  // Add incoming messages to the chat
      }
    });
  }

  // Select user and load their messages
  selectUser(user: any) {
    this.selectedUser = user;
    this.selectedUserMessages = []; // Clear the chat window
  }

  // Send message to the selected user
  sendMessage(): void {
    if (this.selectedUser && this.messageContent) {
      const message: Message = {
        sender: 'User1', // Example: replace with actual logged-in user
        recipient: this.selectedUser.name,
        content: this.messageContent
      };
      this.chatService.sendMessage(message);  // Send message via WebSocket
      this.messageContent = '';  // Clear the input field
    }
  }

}

export interface Message {
  sender: string;
  recipient: string;
  content: string;
}