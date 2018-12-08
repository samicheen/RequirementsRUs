import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddPropertyComponent } from "../add-property/add-property.component";
import { PropertiesComponent } from "./properties.component";

const routes: Routes = [
    { path: "properties/:id", component: PropertiesComponent },
    { path: "add-property/:id", component: AddPropertyComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PropertyRoutingModule { }
