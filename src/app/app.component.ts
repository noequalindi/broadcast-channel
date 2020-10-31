import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {BroadcastService} from './broadcast-service';
import {Subscription} from 'rxjs';
import { BROADCAST_SERVICE_TOKEN } from './app.tokens';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
   
export class AppComponent implements OnInit, OnDestroy {
  title = 'Broadcast Channel - Contact Channel';
  message = null;
  values = [];
  subscription = new Subscription();

  constructor(@Inject(BROADCAST_SERVICE_TOKEN) private broadCastService: BroadcastService) {}

  buttonClicked() {
    this.broadCastService.publish({
      type: 'message',
      data: this.message
    })
    console.log('sended message', this.message)
  }

  onKey($event) {
    this.message = $event.target.value;
  }

  ngOnInit(): void {
    this.subscription = this.broadCastService.typeOfMessage('message').subscribe(message => {
      console.log('received message', message);
      this.message = message.data;
      this.values.push(this.message)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
