import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';

import { BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { TempComponent } from './temp/temp.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PostpageComponent } from './postpage/postpage.component';
import { MenupageComponent } from './menupage/menupage.component';
import { CreateOrEditPostComponent } from './create-or-edit-post/create-or-edit-post.component';
import { SearchmenuComponent } from './searchmenu/searchmenu.component';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from "primeng/fileupload";
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { UploadComponent } from './upload/upload.component';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        EditorModule,
        FileUploadModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        PopoverModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        TempComponent,
        MainpageComponent,
        PostpageComponent,
        MenupageComponent,
        CreateOrEditPostComponent,
        SearchmenuComponent,
        UploadfileComponent,
        UploadComponent,
    ],
    exports:[
    ],
    bootstrap: [],
    providers: [
        { provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
        { provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
        { provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class MainModule { }
