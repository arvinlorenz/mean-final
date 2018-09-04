import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../posts/post.model';
import { PostsService } from '../../posts/post.service';
import { PageEvent } from '../../../../node_modules/@angular/material';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  {
  // posts = [
  //   {title: 'First Post', content: 'This is the first post'},
  //   {title: 'Third Post', content: 'This is the first Third'},
  //   {title: 'Second Post', content: 'This is the first Second'},
  // ]

  posts:Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  userId: string;
  pageSizeOptions = [1,2,5,10];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  
  userIsAuthenticated = false;
  constructor(public postsService: PostsService, private authService: AuthService){}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postsData:{posts: Post[],postCount: number})=>{
        this.isLoading = false;
        this.totalPosts = postsData.postCount;
        this.posts = postsData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      })
  }

  onChangePage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId)
      .subscribe(()=>{
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      }, () =>{
        this.isLoading = false;
      });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  
  

}
