import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DemoUiComponentsServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
  animations: [appModuleAnimation()]
})
export class UploadfileComponent extends AppComponentBase {

  uploadUrl: string;
  uploadedFiles: any[] = [];

  constructor(
    injector: Injector,
    private demoUiComponentsService: DemoUiComponentsServiceProxy
  ) {
    super(injector);
    this.uploadUrl = AppConsts.remoteServiceBaseUrl + '/DemoUiComponents/UploadFiles';
  }

  // upload completed event
  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
  }

  onBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + abp.auth.getToken());
  }
}
