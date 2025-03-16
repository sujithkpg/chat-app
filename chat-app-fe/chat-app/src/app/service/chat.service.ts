import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
private socket: WebSocketSubject<any>;

constructor() { 
  this.socket = new WebSocketSubject("ws://localhost:8080/chat")
}
sendMessage(message:string):void
{
this.socket.next(message);
}

getMessages() {
  return this.socket.asObservable().pipe(
    // Add this operator to handle plain text messages
    map((message: string) => {
      try {
        // Try to parse the message as JSON if it might be a JSON string
        return JSON.parse(message);
      } catch (e) {
        // If it's not a valid JSON, return the message as a string
        return message;
      }
    })
  );
}
}
