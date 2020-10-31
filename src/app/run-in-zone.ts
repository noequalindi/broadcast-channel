import { Observable, OperatorFunction } from 'rxjs';
import { NgZone } from '@angular/core';

/*
 Function that ensures that all the links in the life cycle of an Observable are executed in the NgZone.

The service itself does not run the Angular zone, because it uses an API that does not connect to Angular.
If you get a message and update the internal state of a component, Angular doesn't immediately notice.
Angular will not immediately see any changes reflected in the browser.
Only after the next change detection is triggered will the results be visible within the browser.
*/

export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}
