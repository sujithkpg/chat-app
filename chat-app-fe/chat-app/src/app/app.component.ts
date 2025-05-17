import { Component,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { ChatAppComponent } from "./component/chat-app/chat-app.component";

import { routes } from './app.routes';
import { RouterOutlet, RouterLink  } from '@angular/router';
@Component({
  selector: 'app-root',
   standalone: true, 
  imports: [ ChatAppComponent,
     RouterOutlet,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this to allow web components
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-app';
}
