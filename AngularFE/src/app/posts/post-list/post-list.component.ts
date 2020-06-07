import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import {PageEvent} from "@angular/material/paginator";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  totalPosts = 10;
  postsPerPage = 5;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  isLoading = false;

  constructor(public postsService : PostsService, private  authService : AuthService) { }

  private postSubscription : Subscription;
  @Input() posts: Post[] = []
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, 1);
    this.userId = this.authService.getUserId();
    this.postSubscription = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        setTimeout(()=>{ this.isLoading = false }, 2000);
        this.posts = postData.posts;
        this.totalPosts= postData.postCount;
      });

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }


  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


  onDelete(postId:string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.postsPerPage =pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);

  }
}
