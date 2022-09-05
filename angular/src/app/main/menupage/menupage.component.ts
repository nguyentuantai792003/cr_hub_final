import { Component, Injector, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BlockPostMenuDto, PostDto, PostMenuServiceProxy, PostServiceProxy } from '@shared/service-proxies/service-proxies';
import { Location } from '@angular/common';
import { result } from 'lodash-es';
import * as _ from 'lodash';
@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})
export class MenupageComponent extends AppComponentBase{

  posts: PostDto[] = [];
  menus: BlockPostMenuDto[] = [];
  public sendId: string;
  routes: string;
  menuName: string;
  tenantId: number = abp.session.tenantId;

  constructor(
    injector: Injector,
    private _postService: PostServiceProxy,
    private _postMenuService: PostMenuServiceProxy,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    super(injector)
    router.events.subscribe(val => {
      this.sendId = this.route.snapshot.paramMap.get('id');
      this.getPosts();
    });
}

  ngOnInit(): void {
    this.sendId = this.route.snapshot.paramMap.get('id');
    this.getPosts();
  }

  getPosts(): void {
    this._postMenuService.loadAll().subscribe((result) => {
      this.menus = result;
    })

    this._postMenuService.loadById(parseInt(this.sendId)).subscribe((result) => {
      this.menuName = result[0].menuName;
    });

    this._postService.loadByMenuId(parseInt(this.sendId)).subscribe((result) => {
        this.posts = result;
    });
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
              location.href = `/app/main/menupage/${parseInt(this.sendId)}`;
          });
        }
      }
    );
  } 
}
