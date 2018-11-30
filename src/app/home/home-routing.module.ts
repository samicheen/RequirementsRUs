import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddProjectComponent } from "../add-project/add-project.component";
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "add-project", component: AddProjectComponent },
    { path: "project-details/:id", component: ProjectDetailsComponent },
    { path: "add-project/:id", component: AddProjectComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
