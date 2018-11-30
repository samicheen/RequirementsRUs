import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { AddProjectComponent } from "../add-project/add-project.component";
import { ProjectDetailsComponent } from "../project-details/project-details.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule
    ],
    declarations: [
        HomeComponent,
        AddProjectComponent,
        ProjectDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
