import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RolePermission {
    permissions;
    defaultData = /**
     * This should be removed , and loaded from json file
     */`{
    "default":{
        "default-route": "booking-management"
    },
    "booking-officer":{
        "routes-with-data-permissions": {
            "user-management": {
                "admin": "read"
            }
        }
    },
     "accountant":{
        "routes-with-data-permissions": {
            "user-management": {
                "admin": "read",
                "booking-officer": "read",
                "interpreter": "read",
                "organizational-representitive": "read"
            }
        }
    },
    "interpreter": {
        "not-allowed-routes": [
            "user-management"
        ],
        "routes-with-data-permissions": {
            "booking-management": {
                "admin": "no-access",
                "booking-officer": "no-access",
                "accountant": "no-access",
                "organizational-representitive": "no-access"
            }
        }
    },
    "organization-representitive": {
        "not-allowed-routes": [
            "user-management"
        ],
        "routes-with-data-permissions": {
            "booking-management": {
                "admin": "no-access",
                "booking-officer": "no-access",
                "interpreter": "no-access",
                "organizational-representitive": "no-access"
            }
        }
    },
    "admin": {
       
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

    isDataRestricted(role: any, path: any, data_owner: any) {
        return Boolean(this.permissions[role] && this.permissions[role]['routes-with-data-permissions']
        && this.permissions[role]['routes-with-data-permissions'][path] &&
        this.permissions[role]['routes-with-data-permissions'][path][data_owner] &&
            this.permissions[role]['routes-with-data-permissions'][path][data_owner] === 'no-access');
    }
}
