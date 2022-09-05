import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BlockPostMenuDto, FileUploadDto, MenuDto, PostDto, PostFileServiceProxy, PostMenuServiceProxy, PostServiceProxy, SinglePostDto } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { CreateOrEditPostComponent } from '../create-or-edit-post/create-or-edit-post.component';

@Component({
  selector: 'postPage',
  templateUrl: './postpage.component.html',
  styleUrls: ['./postpage.component.css'],
})
export class PostpageComponent extends AppComponentBase {
  
  //@ViewChild('createOrEditPost', { static: true }) CreateOrEditPost: CreateOrEditPostComponent;

  currentPost: SinglePostDto;
  currentRootMenu: MenuDto;
  posts: PostDto[] = [];
  postId: string;
  menuId: string;
  menus: BlockPostMenuDto[] = [];
  relatedPosts: PostDto[] = [];
  countPost = 0;
  files: FileUploadDto[] = [];
  tenantId: number = abp.session.tenantId;

  constructor(
    injector: Injector,
    private _postService: PostServiceProxy,
    private _postMenuService: PostMenuServiceProxy,
    private route: ActivatedRoute,
    private _postFileService: PostFileServiceProxy
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.menuId = params.get('menu');  
      this.postId = params.get('id');  
    });
    this.loadPost();
  }

  loadPost(): void {
    this._postService.loadById(parseInt(this.postId)).subscribe((result) => {
      this.currentPost = result[0];
    })

    this._postMenuService.loadAll().subscribe((result) => {
      this.menus = result;
    })

    this._postService.loadAll().subscribe((result) => {
      this.posts = result;
    })

    this._postMenuService.getRootIdFromPostId(parseInt(this.postId)).subscribe((result) => {
      this.currentRootMenu = result[0];
    })

    this._postService.loadRelatedPost(parseInt(this.menuId)).subscribe((result) => {
      this.relatedPosts = result;
    })

    this._postFileService.loadFileById(parseInt(this.postId)).subscribe((result) => {
      this.files = result;
      console.log(this.files);
    })
  }

  deletePost(data: SinglePostDto): void {
    this.message.confirm(
      this.l(''),
      this.l('AreYouSure'),
      isConfirmed => {
        if (isConfirmed) {
          this._postService.delete(data.id).subscribe(() => {
            this.notify.info(this.l('SuccessfullyDeleted'));
            _.remove(this.posts, data);
            if (data.id == this.currentPost.id)
            {
              location.href = `/app/main/menupage/${data.menuId}`;
            }
            else
            {
              location.href = `/app/main/postpage/${this.currentPost.menuId}/${this.currentPost.id}`;
            }
          });
        }
      }
    );
  }
  
  convert(text: string): void {
    const original = document.getElementById("original");
    original.innerHTML = text;
  }
}
