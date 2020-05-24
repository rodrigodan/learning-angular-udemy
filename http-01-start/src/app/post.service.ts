import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService{

    error = new Subject<string>();

    constructor(private http: HttpClient){}
    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content, key:''};
        this.http
        .post<{name:string}>(
          'https://ng-complete-guide-ec285.firebaseio.com/posts.json',
          postData
        )
        .subscribe(responseData => {
          console.log(responseData);
        },
        error =>{
            this.error.next(error);
        });
    }

    fetchPost(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key'); 
        return this.http
        .get<{[key: string]: Post}>('https://ng-complete-guide-ec285.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'custom-header': 'hello' }),
                params: searchParams
            }
        )
        .pipe(map(responseData=>{
          const postArray = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postArray.push({...responseData[key], id:key});
            }
          }
          return postArray;
        }),
        catchError(errorRes => {
            //send analytic server
            return throwError(errorRes);
        })
        );
    }

    deletePosts(){
        return this.http
            .delete('https://ng-complete-guide-ec285.firebaseio.com/posts.json');
    }
}