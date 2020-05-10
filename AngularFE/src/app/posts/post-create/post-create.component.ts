import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../post.service';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor( public postsService : PostsService, public route: ActivatedRoute) { }

  private mode = 'create';
  isLoading = false;
  private postId:string;
  post:Post;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(postData =>{
          this.isLoading = false
          this.post = {id: postData._id, title: postData.title, content: postData.content }
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

    @Output() postCreated = new EventEmitter<Post>();


  enteredTitle = '';
  enteredContent = '';

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();

  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();

  }
  }
