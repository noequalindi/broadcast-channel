import { Observable, OperatorFunction } from 'rxjs';
import { NgZone } from '@angular/core';

/**
Custom feature that ensures that all links in the lifecycle of an Observable run in NgZone.
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