import { Component, OnInit, OnDestroy } from '@angular/core';
import {interval, Subscription, Observable} from 'rxjs'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }
 
  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    // observables is a concept
    // observer is the one that informs about new data, about errors, or about the observable being completed
    const customIntervalObservable = Observable.create((observer)=>{
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          if(count === 2){
            observer.complete();
          }
          if(count > 3){
            observer.error(new Error('Count is greater than 3'))
          }
          count ++;
        }, 1000)
    })
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);

    }, error =>{
      alert(error.message);
    }, ()=>{
      console.log('completed!')
    })
  }
 
  ngOnDestroy(): void{
    this.firstObsSubscription.unsubscribe();
  }

}
