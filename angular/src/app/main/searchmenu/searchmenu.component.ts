import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BlockPostMenuDto, PostDto, PostMenuServiceProxy, PostServiceProxy } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';
import { result } from 'lodash-es';

@Component({
  selector: 'app-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})
export class SearchmenuComponent extends AppComponentBase {

  posts: PostDto[] = [];
  menus: BlockPostMenuDto[] = [];
  searchWord: string;
  tenantId: number = abp.session.tenantId;

  constructor(
    injector: Injector,
    private _postService: PostServiceProxy,
    private _postMenuService: PostMenuServiceProxy,
    private route: ActivatedRoute,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.searchWord = this.route.snapshot.paramMap.get('searchWord');
    this.loadPost();
  }

  loadPost(): void {
    this._postMenuService.loadAll().subscribe((result) => {
      this.menus = result;
    })

    this._postService.searchPost(this.searchWord).subscribe((result) => {
      this.posts = result;
    })
  }

  deletePost(data: PostDto): void {
    this.message.confirm(
      this.l(''),
      this.l('AreYouSure'),
      isConfirmed => {
        if (isConfirmed) {
          this._postService.delete(data.id).subscribe(() => {
            this.notify.info(this.l('SuccessfullyDeleted'));
            _.remove(this.posts, data);
              location.href = `/app/main/menupage/${this.searchWord}`;
          });
        }
      }
    );
  }
}
