import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router'; // for routing
import { FormsModule } from '@angular/forms'; // to handle forms

import { AppComponent } from './app.component';
import { JoinComponent } from './join/join.component';
import { provideHttpClient } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ChatComponent },
      { path: 'join', component: JoinComponent },
    ]),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {} 