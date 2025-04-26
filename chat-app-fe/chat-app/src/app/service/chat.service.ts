import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { Client } from '@stomp/stompjs';

import { Subject } from 'rxjs';

import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client = new Client(); // Use Client from @stomp/stompjs
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {}

  // Connect to WebSocket server using SockJS and Stomp
  connect() {
    const socket = new SockJS('http://localhost:8080/chat'); // WebSocket endpoint
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/chat', // WebSocket URL
      connectHeaders: {},
      debug: function (str) {
        console.log(str); // Logs all debug information
      },
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log('Connected: ' + frame);

        // Subscribe to /topic/messages for broadcast messages
        this.stompClient.subscribe('/topic/messages', (message: any) => {
          this.messagesSubject.next(JSON.parse(message.body)); // Push message to Subject
        });

        // Subscribe to /user/queue/reply for user-specific messages
        this.stompClient.subscribe('/user/queue/reply', (message: any) => {
          this.messagesSubject.next(JSON.parse(message.body)); // Push message to Subject
        });
      },
    });

    this.stompClient.activate(); // Activate the connection
  }

  // Send message to a specific user
  sendMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(message),
      });
    }
  }

  // Get messages as an observable
  getMessages() {
    return this.messagesSubject.asObservable(); // Return an observable for messages
  }

  // Broadcast message to all connected clients
  broadcastMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/broadcastMessage',
        body: JSON.stringify(message),
      });
    }
  }
}
