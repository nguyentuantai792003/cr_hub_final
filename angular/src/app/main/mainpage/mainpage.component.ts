import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { BlockPostMenuDto, PostDto, PostMenuServiceProxy, PostServiceProxy } from '@shared/service-proxies/service-proxies';
import * as _ from 'lodash';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  template: ``,
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent extends AppComponentBase {

  menus: BlockPostMenuDto[] = [];
  title: string;
  id: number;
  tenantId: number = abp.session.tenantId;
  public response: { dbPath: '' }

  constructor(
    injector: Injector,
    private _postMenuService: PostMenuServiceProxy,
    private _postService: PostServiceProxy
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.getMenus();
    
  }

  getPostId(value: number): void {
    this.id = value;
  }

  getMenus(): void {
    this._postMenuService.loadAll().subscribe((result) => {
        this.menus = result;
    });
  }

  deletePost(data: PostDto, menuId: number): void {
    this.message.confirm(
      this.l(''),
      this.l('AreYouSure'),
      isConfirmed => {
        if (isConfirmed) {
          this._postService.delete(data.id).subscribe(() => {
            this.notify.info(this.l('SuccessfullyDeleted'));
            _.remove(this.menus[menuId].postDtos, data);
              location.href = `/app/main/mainpage`;
          });
        }
      }
    );
  }

  public uploadFinished = (event) => {
    this.response = event;
  }

}
