import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {

    this.isFetching = true;

    this.postService.fetchPost()
    .subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    },error=>{
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
}
