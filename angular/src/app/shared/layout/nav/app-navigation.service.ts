import {PermissionCheckerService} from 'abp-ng2-module';
import {AppSessionService} from '@shared/common/session/app-session.service';

import {Injectable} from '@angular/core';
import {AppMenu} from './app-menu';
import {AppMenuItem} from './app-menu-item';

@Injectable()
export class AppNavigationService {

    constructor(
        private _permissionCheckerService: PermissionCheckerService,
        private _appSessionService: AppSessionService
    ) {

    }

    getMenu(): AppMenu {
        return new AppMenu('MainMenu', 'MainMenu', [
            new AppMenuItem('Trang chủ', '', 'flaticon-tabs', '/app/main/menupage/1'),

            new AppMenuItem('Về chúng tôi', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('Sứ mệnh/vai trò/trách nhiệm', '', 'falticon-tabs', '/app/main/menupage/10'),
                new AppMenuItem('Sơ đồ tổ chức', '', 'falticon-tabs', '/app/main/menupage/3'),
                new AppMenuItem('Kế hoạch 3 năm', '', 'falticon-tabs', '/app/main/menupage/4'),
                new AppMenuItem('Kế hoạch năm 2022', '', 'falticon-tabs', '/app/main/menupage/5')
            ]),

            new AppMenuItem('Hoạt động chính', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('Hoạt động & tài liệu đào tạo', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Cơ bản', '', 'falticon-tabs', '/app/main/menupage/9'),
                    new AppMenuItem('Nâng cao', '', 'falticon-tabs', '/app/main/menupage/11'),
                    new AppMenuItem('Cao cấp', '', 'falticon-tabs', '/app/main/menupage/12'),
                    new AppMenuItem('Hội thảo CR', '', 'falticon-tabs', '/app/main/menupage/13')
                ]),
                new AppMenuItem('Hoạt động giải quyết khiếu nại', '', 'falticon-tabs', '/app/main/menupage/14'),
                new AppMenuItem('Hoạt động kaizen dựa trên ý kiến KH', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Kết quả báo cáo tháng', '', 'falticon-tabs', '/app/main/menupage/16'),
                ]),
                new AppMenuItem('Hoạt động khảo sát NPS', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Bảng câu hỏi khảo sát NPS hiện tại', '', 'falticon-tabs', '/app/main/menupage/18'),
                ]),
                new AppMenuItem('Hoạt động Delight', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Customer Delight', '', 'falticon-tabs', '', [], [
                        new AppMenuItem('Delight SOP', '', 'falticon-tabs', '/app/main/menupage/21'),
                        new AppMenuItem('Best practice sharing', '', 'falticon-tabs', '/app/main/menupage/22'),
                        new AppMenuItem('Delight Buletin', '', 'falticon-tabs', '/app/main/menupage/23'),
                        new AppMenuItem('Monthly report', '', 'falticon-tabs', '/app/main/menupage/24')
                    ]),
                    new AppMenuItem('Employee satisfaction activity', '', 'falticon-tabs', '', [], [
                        new AppMenuItem('ES survey & kaizen SOP', '', 'falticon-tabs', '/app/main/menupage/26'),
                        new AppMenuItem('Best practice sharing', '', 'falticon-tabs', '/app/main/menupage/27'),
                    ])
                ])
            ]),

            new AppMenuItem('Tài liệu', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('Sách', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Cẩm nang giải quyết khiếu nại', '', 'falticon-tabs', '/app/main/menupage/30'),
                    new AppMenuItem('Sử dụng hiệu quả ý kiến Khách hàng', '', 'falticon-tabs', '/app/main/menupage/31'),
                    new AppMenuItem('Sách Omotenashi', '', 'falticon-tabs', '/app/main/menupage/32'),
                    new AppMenuItem('Sách an toàn', '', 'falticon-tabs', '/app/main/menupage/33')
                ]),
                new AppMenuItem('Công cụ', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('Hướng dẫn sử dụng VOC network', '', 'falticon-tabs', '/app/main/menupage/35'),
                    new AppMenuItem('Q & A', '', 'falticon-tabs', '/app/main/menupage/36')
                ]),
                new AppMenuItem('Form báo cáo', '', 'falticon-tabs', '', [], [
                    new AppMenuItem('CR Training', '', 'falticon-tabs', '', [], [
                        new AppMenuItem('Internal training report template', '', 'falticon-tabs', '/app/main/menupage/39'),
                        new AppMenuItem('ORG (Basic & Advance)', '', 'falticon-tabs', '/app/main/menupage/40')
                    ]),
                    new AppMenuItem('VOC', '', 'falticon-tabs', '/app/main/menupage/41'),
                    new AppMenuItem('Delight & ES', '', 'falticon-tabs', '/app/main/menupage/42')
                ])
            ]),

            new AppMenuItem('Tin tức', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('Các hoạt động sắp tổ chức', '', 'falticon-tabs', '/app/main/menupage/44'),
            ]),

            new AppMenuItem('Liên hệ', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('SĐT tổng đài', '', 'falticon-tabs', '/app/main/menupage/46'),
                new AppMenuItem('Box ghi lại lời nhắn', '', 'falticon-tabs', '/app/main/menupage/47'),
            ]),

            new AppMenuItem('Administration', '', 'flaticon-tabs', '', [], [
                new AppMenuItem('Tenants', 'Pages.Tenants', 'flaticon-list-3', '/app/admin/tenants'),
                new AppMenuItem('Users', 'Pages.Administration.Users', 'flaticon-users', '/app/admin/users'),
                new AppMenuItem('Roles', 'Pages.Administration.Roles', 'flaticon-suitcase', '/app/admin/roles'),
            ])        
        ]);
    }

    checkChildMenuItemPermission(menuItem): boolean {

        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName === '' || subMenuItem.permissionName === null) {
                if (subMenuItem.route) {
                    return true;
                }
            } else if (this._permissionCheckerService.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                let isAnyChildItemActive = this.checkChildMenuItemPermission(subMenuItem);
                if (isAnyChildItemActive) {
                    return true;
                }
            }
        }
        return false;
    }

    showMenuItem(menuItem: AppMenuItem): boolean {
        if (menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' && this._appSessionService.tenant && !this._appSessionService.tenant.edition) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (menuItem.permissionName && !this._permissionCheckerService.isGranted(menuItem.permissionName)) {
            hideMenuItem = true;
        }

        if (this._appSessionService.tenant || !abp.multiTenancy.ignoreFeatureCheckForHostUsers) {
            if (menuItem.hasFeatureDependency() && !menuItem.featureDependencySatisfied()) {
                hideMenuItem = true;
            }
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return !hideMenuItem;
    }

    /**
     * Returns all menu items recursively
     */
    getAllMenuItems(): AppMenuItem[] {
        let menu = this.getMenu();
        let allMenuItems: AppMenuItem[] = [];
        menu.items.forEach(menuItem => {
            allMenuItems = allMenuItems.concat(this.getAllMenuItemsRecursive(menuItem));
        });

        return allMenuItems;
    }

    private getAllMenuItemsRecursive(menuItem: AppMenuItem): AppMenuItem[] {
        if (!menuItem.items) {
            return [menuItem];
        }

        let menuItems = [menuItem];
        menuItem.items.forEach(subMenu => {
            menuItems = menuItems.concat(this.getAllMenuItemsRecursive(subMenu));
        });

        return menuItems;
    }
}
