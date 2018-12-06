import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FeatureModule } from "./feature/feature.module";
import { HomeModule } from "./home/home.module";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { PropertyModule } from "./property/property.module";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        HomeModule,
        FeatureModule,
        PropertyModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
