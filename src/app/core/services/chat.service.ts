import { Injectable } from '@angular/core';
import { Socket } from 'ng6-socket-io';
import * as io from 'socket.io-client';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
    private socket = io('http://localhost:3000');
    constructor() {
        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('news', function(news) {
            console.log(news.hello);
        });
     }

    sendMessage(msg: string) {
        this.socket.emit('message', msg);
    }

    disconnect(msg: string) {
        console.log('disconnect');
        this.socket.emit('disconnect', msg);
    }

    // getMessage() {
    //     return this.socket
    //         .fromEvent('message')
    //         .subscribe( data => data );
    // }
}
