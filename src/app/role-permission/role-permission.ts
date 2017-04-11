import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RolePermission {
    permissions;
    defaultData = `{
    "default":{
        "default-route": "user-management"
    },
    "booking-officer":{
        "default-route": "booking-management"
    },
    "interpreters": {
        "not-allowed-routes": [
            "booking-management"
        ],
        "routes-with-data-permissions": {
            "user-management": {
                "admin": "read"
            }
        }
    },
    "admin": {
        "default-route": "user-management"
    }
}`;
    constructor(private http: Http) { }
    loadData() {
        let o = this.http.get('./src/app/role-permission/role-permission.json')
            .subscribe((res) => { this.permissions = res.json(); o.unsubscribe(); });
    }

    loadDefaultData() {
        this.permissions = JSON.parse(this.defaultData);
    }

    getDefaultRoute(role: any) {
        return Boolean(this.permissions[role] && this.permissions[role]['default-route'] ) ?
        this.permissions[role]['default-route']
        : this.permissions.default['default-route'];
    }

    isRestrictedRoute(role: any, path: any) {
        return Boolean(this.permissions[role] && this.permissions[role]['not-allowed-routes']
            && this.permissions[role]['not-allowed-routes'].some(x => x === path));
    }

    isDataReadOnly(role: any, path: any, data_owner: any) {
        return Boolean(this.permissions[role] && this.permissions[role]['routes-with-data-permissions']
        && this.permissions[role]['routes-with-data-permissions'][path] &&
        this.permissions[role]['routes-with-data-permissions'][path][data_owner] &&
            this.permissions[role]['routes-with-data-permissions'][path][data_owner] === 'read');
    }
}
