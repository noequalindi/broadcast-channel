import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {NgZone} from '@angular/core';
import {runInZone} from './run-in-zone';

/* The BroadcastChannel that publishes a message will not receive the message itself,
  even if you have a registered listener. If a BroadcastChannel instance is created
  separate to publish and consume messages, the browser window where the message was published will also receive the message. To avoid this,
   It is recommended to create a singleton instance per BroadcastChannel.
*/

interface BroadcastMessage {
  type: string;
  data: any;
}

export class BroadcastService {
  private broadcastChannel: BroadcastChannel;
  private onMessage = new Subject<any>();

  constructor(broadcastChannelName: string, private ngZone: NgZone) {
    this.broadcastChannel = new BroadcastChannel(broadcastChannelName);
    this.broadcastChannel.onmessage = (message) => this.onMessage.next(message.data);
  }

  publish(message: BroadcastMessage): void {
    this.broadcastChannel.postMessage(message);
  }

  typeOfMessage(type: string): Observable<BroadcastMessage> {
    return this.onMessage.pipe(
       // It is important to run NgZone. (A zone is an execution context that persists across asynchronous tasks.)
       // you can bind DOM events to a method of an angular component. In such methods you can also update a property of the Angular component,
       // that updates the corresponding data shown in the template
       // NgZone ensures that angular component changes are immediately visible in the browser when updated after receiving messages.
      runInZone(this.ngZone),
      filter(message => message.type === type)
    );
  }
}
