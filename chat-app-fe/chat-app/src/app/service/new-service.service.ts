import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService {

  countValue :BehaviorSubject<number> = new BehaviorSubject(0);

  subjectValue : Subject<number> = new Subject();

  signalVal =  signal(100);

  constructor() { 

  }

  getSignal()
  {
    return this.signalVal();
  }

  incrementSignal()
  {
    this.signalVal.update((currentVal)=>currentVal+1);
  }

  getCounterSubject$():Observable<number>
  {
    return this.subjectValue.asObservable();
  }

  getCounter$():Observable<number>
  {
    return this.countValue.asObservable();
  }

  increment()
  {
    let val = this.countValue.getValue();
    this.countValue.next(++val);
  }

  incrementSubject()
  {
    this.subjectValue.next(this.countValue.getValue()*10);
  }

  getCountValue():number
  {
    return this.countValue.getValue();
  }

  emitValue(val:number)
  {
    this.countValue.next(val);
  }
}
