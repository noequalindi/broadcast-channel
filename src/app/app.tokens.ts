import { inject, InjectionToken, NgZone } from '@angular/core';
import { BroadcastService } from './broadcast-service';

export const BROADCAST_SERVICE_TOKEN = new InjectionToken<BroadcastService>('broadCastService', {
  factory: () => new BroadcastService('broadcast-service', inject(NgZone))
});
