import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  
    isLoading: boolean | undefined;
    currentTenant = abp.session.tenantId;
    claimId: number | undefined;
    partRecvId: number | undefined;
    attachFiles: any[] = [];
    fileName: string = '';
    formData: FormData = new FormData();
    uploadUrl: string = 'https://localhost:44301/api/upload';
    downloadUrl: string = '';
    removeUrl: string = '';

  constructor(
    private http: HttpClient,
    private appSessionService: AppSessionService,
    private _httpClient: HttpClient
  ) { }
  ngOnInit() {
  }

  onUpload(data: { target: { files: Array<any> } }): void {
        if (data?.target?.files.length > 0) {
            this.formData = new FormData();
            const formData: FormData = new FormData();
            const file = data?.target?.files[0];
            this.fileName = file?.name;
            let fileName = `${(this.fileName.split('.'))[0]}_${this.appSessionService.tenancyName}_${(new Date()).getTime()}.${(this.fileName.split('.'))[1]}`;
            formData.append('file', file, fileName);
            this.formData = formData;
        }
    }

    getUploadedFiles() {
      this.isLoading = true;
    }

    upload() {
        this.isLoading = true;
        this._httpClient
            .post<any>(this.uploadUrl, this.formData)
            .pipe(finalize(() => {
                
            })).subscribe(response => {
              console.log("Hello");
              console.log(this.formData);
            });
    }

}
