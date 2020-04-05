import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,OnDestroy {
  private activatedSub: Subscription;
  userActivated = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate =>{
      this.userActivated = didActivate;
    })
  }
  ngOnDestroy(){
    this.activatedSub.unsubscribe()
  }
}
