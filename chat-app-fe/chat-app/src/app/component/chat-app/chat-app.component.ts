import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors, ValueChangeEvent } from '@angular/forms'
import { CommonModule } from '@angular/common'; 
import { AppHighlite } from '../../directive/AppHighlight';
import { CapsText } from '../../pipe/CapsText';
import {Observable, Subscriber,of} from 'rxjs';
import {filter, map} from 'rxjs/operators'

@Component({
  selector: 'app-chat-app',
  standalone: true,
  imports: [FormsModule,CommonModule,AppHighlite,CapsText,ReactiveFormsModule],
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
  fg! : FormGroup;

   myObservable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    subscriber.complete();
  });

  newObservable = new Observable(subscriber=>{
    subscriber.next('Sujith');
    subscriber.next('Gamage');
  });

  constructor(private chatService: ChatService,private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.myObservable.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Observable is complete')
    });

    this.newObservable.subscribe({
      next: (value) =>console.log(value),
      complete:( ) => console.log('Finish second observable')
    });

    this.fg = new FormGroup(
      {
        firstName: new FormControl('',[Validators.required,Validators.minLength(3),nameValidator('admin')]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
        email : new FormControl('',[Validators.required,Validators.email])
    });

    // Establish WebSocket connection
    this.chatService.connect();

    // Listen for incoming messages
    this.chatService.getMessages().subscribe((message: Message) => {
      if (this.selectedUser && this.selectedUser.name === message.sender) {
        this.selectedUserMessages.push(message);  // Add incoming messages to the chat
      }
    });

    of(1,2,3).pipe(map(value => value *2)).subscribe( console.log);
    of(1,5,3).pipe(filter(value=> value>3)).subscribe(
      console.log
    )

    // this.initFormGroup();
  }

  // initFormGroup()
  // {
  //   this.fg = new FormGroup(
  //     {
  //       firstName: new FormControl('',[Validators.required,Validators.maxLength(3)]),
  //       lastName: new FormControl('',[Validators.required,Validators.maxLength(3)]),
  //       email : new FormControl('',[Validators.required,Validators.email])
  //   });
  // }

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

  onSubmit()
  {
    alert('I am going to submit this!!');
  }

}

export function nameValidator(name:string): ValidatorFn
{
  return (control:AbstractControl):ValidationErrors | null =>{
    const isForbidden = control.value === name;
    return isForbidden ?{'forbiddenName':{value:control.value}}:null;
  }
}

export interface Message {
  sender: string;
  recipient: string;
  content: string;
}