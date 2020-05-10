import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  constructor(public postsService : PostsService) { }
  private postSubscription : Subscription;
  @Input() posts: Post[] = []
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSubscription =  this.postsService.getPostUpdateListener()
      .subscribe((postsReceived: Post[])=> {
        setTimeout(() => {this.isLoading = false}, 2000);
        this.posts = postsReceived;
      });
  }
  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postId:string){
    this.postsService.deletePost(postId);
  }
}
