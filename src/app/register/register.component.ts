import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { Register } from "./Register";
import { alert } from 'tns-core-modules/ui/dialogs';

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html"
})
export class RegisterComponent { 
    public input: Register;

    public constructor(private location: Location, private router: RouterExtensions) {
        this.input = Object();
    }

    public async register() {
        if (!this.input.username || !this.input.password) {
            this.alert('Please provide both username and password.');
            return;
        }
        try{
            await Kinvey.User.logout();
            var user = await Kinvey.User.signup({
                firstname: this.input.firstname,
                lastname: this.input.lastname,
                email: this.input.email,
                username: this.input.username,
                password: this.input.password
            });
            if(user){
                this.alert('Your account was successfully created.');
            }
        } catch (error) {
            this.alert('Unfortunately we were unable to create your account.');
            console.log('error', error);
        }
    }

    public goBack() {
        this.location.back();
    }

    alert(message: string) {
        return alert({
          title: 'Requirement R Us',
          okButtonText: 'OK',
          message
        });
      }
}