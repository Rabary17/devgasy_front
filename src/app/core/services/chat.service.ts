import { Injectable } from '@angular/core';
import { Socket } from 'ng6-socket-io';
import * as io from 'socket.io-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable()
export class ChatService {

    constructor(
        private _messageService: MessageService,
    ) {
        // this.socket.on('connect', function () {
        //     console.log('Connected!');
        // });

        // this.socket.on('broadcast', function(news) {
        //     alert(news);
        // });

        // this.socket.on('news', function(news) {
        //     console.log(news.hello);
        // });
     }

    sendMessage(msg: string) {
        // this.socket.emit('message', msg);
    }

    disconnect(msg: string) {
        console.log('disconnect');
        // this.socket.emit('disconnect', msg);
    }

    getMessage() {
        return false;
    }
}
