import { Component,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatAppComponent } from "./component/chat-app/chat-app.component";

@Component({
  selector: 'app-root',
  imports: [ ChatAppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this to allow web components
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-app';
}
