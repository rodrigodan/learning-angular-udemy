import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {

    const teste = {
      element1:{
        id: 'dado1',
        e: 'dado2'
      }
    }
    console.log(teste);
    console.log();
    console.log({...teste['element1'], e2: 'dado3'});

    this.errorSub = this.postService.error.subscribe(errorMessage=>{
      this.error = errorMessage;
    })

    this.isFetching = true;
    
    this.postService.fetchPost()
    .subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    },error=>{
      this.isFetching = false;
      this.error = error.message
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
   
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;

    this.postService.fetchPost()
    .subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    },
    error=>{
      this.error = error.message;
      console.log(error);

    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(deletedPosts=>{
      console.log();
      this.loadedPosts = [];
    });
  }

  private fetchPost(){

  }

  onHandleError(){
    this.error = null; 
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
