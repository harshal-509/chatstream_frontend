import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageResponse, Channel, DefaultGenerics } from 'stream-chat';

import { StreamService } from '../stream.service';
import { StateService } from '../state.service';
import { randomId } from 'stream-chat/dist/types/utils';

declare const feather: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
  constructor(
    public streamService: StreamService,
    private stateService: StateService,
    private router: Router
  ) {}

  messages: any[] = [];
  message = '';
  channel!: Channel;

  async sendMessage() {
    if (this.message) {
      try {
        await this.channel.sendMessage({
          text: this.message,
        });
        this.message = '';
      } catch (err) {
        console.log(err);
      }
    }
  }

  getClasses(userId: string): { outgoing: boolean; incoming: boolean } {
    const userIdMatches = userId === this.streamService.currentUser.me.id;
    return {
      outgoing: userIdMatches,
      incoming: !userIdMatches,
    };
  }

  async ngOnInit() {
    feather.replace();
    if (this.stateService.user) {
      this.channel = await this.streamService.initClient(
        this.stateService.user
      );
      await this.channel.watch();
      this.messages = this.channel.state.messages as any;
      this.channel.on('message.new', (event) => {
        this.messages = this.messages.concat(event.message);
      });
    } else {
      this.router.navigate(['join']);
    }
  }
}