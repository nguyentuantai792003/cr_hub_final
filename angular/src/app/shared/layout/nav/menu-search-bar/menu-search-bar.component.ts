import { Component, Injector } from '@angular/core';
import { NameValueOfString } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppNavigationService } from '../app-navigation.service';
import { Router } from '@angular/router';
import { getBaseHref } from 'root.module';

@Component({
  selector: 'menu-search-bar',
  templateUrl: './menu-search-bar.component.html',
  styleUrls: ['./menu-search-bar.component.css']
})
export class MenuSearchBarComponent extends AppComponentBase {

  title = 'My Angular Project!';
  todaydate;
  componentproperty;
  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
  ngOnInit() {
  }
  
  onClickSubmit(data) {
    location.href = `/app/main/searchmenu/${data.searchword}`;
  }
}
