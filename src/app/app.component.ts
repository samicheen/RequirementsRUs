import { Component } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
import * as appSettings from 'tns-core-modules/application-settings';
import { AppSettingKeys } from './app-settings-keys';
import { Kinvey } from 'kinvey-nativescript-sdk';

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
        Kinvey.init({
            appKey: 'kid_ByW9d6tpX',
            appSecret: '01ec6e352fc64ca2b6fc75d0fc429d23'
          });
    
        if (appSettings.hasKey(AppSettingKeys.user_info)) {
          // we still have an active user so go to customerlist
          this.routerExtensions.navigate(['/home']);
        } else {
          this.routerExtensions.navigate(['/login']);
        }
      }
}
