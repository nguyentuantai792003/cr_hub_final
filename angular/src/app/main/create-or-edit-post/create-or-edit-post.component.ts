import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { MenuDirective } from '@metronic/app/core/_base/layout/directives/menu.directive';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { FileUploadDto, MenuDto, PostFileServiceProxy, PostMenuServiceProxy, PostServiceProxy, SavedFileDto, SavedPostDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver-es';
import * as _ from 'lodash';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'createOrEditPost',
  templateUrl: './create-or-edit-post.component.html',
  styleUrls: ['./create-or-edit-post.component.css']
})
export class CreateOrEditPostComponent extends AppComponentBase{

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modal' , { static: false }) modal: ModalDirective;
  @ViewChild('nameInput' , { static: false }) nameInput: ElementRef;
  @ViewChild('imgInput', { static: false }) InputVar: ElementRef;

  savedPost: SavedPostDto = new SavedPostDto();
  newSavedPost: SavedPostDto = new SavedPostDto();
  savedFiles: SavedFileDto[] = [];
  uploadFiles: any;

  active: boolean = false;
  saving: boolean = false;
  create_or_edit_id: number;

  progress: number;
  @Output() public onUploadFinished = new EventEmitter();
  
  isLoading: boolean | undefined;
  currentTenant = abp.session.tenantId;
  claimId: number | undefined;
  partRecvId: number | undefined;
  attachFiles: any[] = [];
  fileName: string = '';
  formData: FormData = new FormData();
  uploadUrl: string = `${AppConsts.remoteServiceBaseUrl}/api/upload`;
  downloadUrl: string = '';
  removeUrl: string = '';
  lastMenus: MenuDto[] = [];
  files: FileUploadDto[] = [];

  constructor(
    injector: Injector,
    private _postService: PostServiceProxy,
    private appSessionService: AppSessionService,
    private _httpClient: HttpClient,
    private _postFileService: PostFileServiceProxy,
    private _postMenuService: PostMenuServiceProxy
  ) {
    super(injector);
  }

  show(id: number): void {
    this._postMenuService.getLastMenu().subscribe((result) => {
      this.lastMenus = result;
    })
    this.savedPost = new SavedPostDto();
    if (id != 0){
      this._postFileService.loadFileById(id).subscribe((result) => {
        this.files = result;
        console.log(this.files);
      })

      this._postService.loadSavedPostById(id).subscribe((result) => {
        this.savedPost = result[0];
      });
    }
    this.create_or_edit_id = id;
    this.active = true;
    this.savedPost.id = id;
    this.modal.show();
  }

  onShown(): void {
    this.nameInput.nativeElement.focus();
  }

  save(): void {
    this.saving = true;
    this._postService.savePost(this.savedPost)
        .pipe(finalize(() => this.saving = false))
        .subscribe((result) => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.close();
          this.modalSave.emit(this.savedPost);
          this.newSavedPost = result;
          this.upload(this.newSavedPost.id);

        });
  }

  close(): void {
    this.modal.hide();
    this.active = false;
  }

  onUpload(data: { target: { files: Array<any> } }): void {
    if (data?.target?.files.length > 0) {
        this.formData = new FormData();
        let file = data?.target?.files;
        this.uploadFiles = file;
        console.log(this.uploadFiles);
        this.fileName = data?.target?.files[0].name;
        for (let i = 0; i < file?.length; i++) {
          let name = data?.target?.files[i].name;
          let fileName = `${(name.split('.'))[0]}.${(name.split('.'))[1]}`;
          this.formData.append('files', file[i], fileName);
        }
    }
  }

  deleteFile(file: FileUploadDto, files: any): void {
    this.message.confirm(
      this.l(''),
      this.l('AreYouSure'),
      isConfirmed => {
        if (isConfirmed) {
          this._postFileService.delete(file.id).subscribe(() => {
            this.notify.info(this.l('SuccessfullyDeleted'));
            _.remove(files, file);
          });
        }
      }
    );
  }

  getUploadedFiles() {
    this.isLoading = true;
  }

  upload(postId) {
    this.isLoading = true;
    this._httpClient
        .post<any>(this.uploadUrl + '/' + postId, this.formData)
        .pipe(finalize(() => {
            
        })).subscribe(response => {
          this.savedFiles = response.result;
          for(var i = 0; i < this.savedFiles.length; i++){
            console.log(this.savedFiles[i]);
            this._postFileService.savePost(this.savedFiles[i]).subscribe();
          }
        });
  }

  reset() {
    setTimeout(() => {
        this.InputVar.nativeElement.value = "";
        this.fileName = '';
        this.InputVar.nativeElement.click();
    }, 500);
  }

  downloadFile(param: any) {
    this._httpClient.get(this.downloadUrl, { params: { 'filename': param.name }, responseType: 'blob' })
        .subscribe(blob => {
            saveAs(blob, param.name);
        });
  }
}
