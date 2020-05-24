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

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {

    this.isFetching = true;

    this.postService.fetchPost()
    .subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
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
    });
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost(){

  }
}
