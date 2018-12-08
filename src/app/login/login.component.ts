import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { Login } from "./Login";
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from 'tns-core-modules/application-settings';
import { AppSettingKeys } from '../app-settings-keys';
import { alert } from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent { 
    public input: Login;

    public constructor(private router: RouterExtensions) {
        this.input = Object();
    }

    public async login() {
        if (!this.input.username || !this.input.password) {
            this.alert('Please provide both username and password.');
            return;
        }
        try{
            await Kinvey.User.logout();
            appSettings.remove(AppSettingKeys.user_info);
            await Kinvey.User.login(this.input.username, this.input.password);
            // save the user Kinvey stuff in application-settings so when app starts on next run it bypasses login
            appSettings.setString(AppSettingKeys.user_info, JSON.stringify(this.input));
            this.router.navigate(['/home']);
        } catch (error) {
            this.alert('We could not find your account. You can sign up for a new account.');
        }
    }

    alert(message: string) {
        return alert({
          title: 'Requirement R Us',
          okButtonText: 'OK',
          message
        });
      }
}