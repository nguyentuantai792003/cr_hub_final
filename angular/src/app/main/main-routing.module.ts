import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateOrEditPostComponent } from './create-or-edit-post/create-or-edit-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MenupageComponent } from './menupage/menupage.component';
import { PostpageComponent } from './postpage/postpage.component';
import { SearchmenuComponent } from './searchmenu/searchmenu.component';
import { TempComponent } from './temp/temp.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } },
                    { path: 'mainpage', component: MainpageComponent, data: { permmimssion: ''}},
                    { path: 'postpage/:menu/:id', component: PostpageComponent, data: { permission: ''}},
                    { path: 'temp', component: TempComponent, data: {permission: ''} },
                    { path: 'menupage/:id', component: MenupageComponent},
                    { path: 'create-or-edit-post', component: CreateOrEditPostComponent, data: { permission: 'Pages.Tenant.Post.CreatePost'}},
                    { path: 'searchmenu/:searchWord', component: SearchmenuComponent },
                    { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
                    { path: '**', redirectTo: 'mainpage' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
