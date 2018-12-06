import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddFeatureComponent } from "../add-feature/add-feature.component";
import { FeaturesComponent } from "./features.component";
import { FeatureDetailsComponent } from "../feature-details/feature-details.component";

const routes: Routes = [
    // { path: "", redirectTo: "features/:id" },
    { path: "features/:id", component: FeaturesComponent },
    { path: "add-feature/add/:projectId", component: AddFeatureComponent },
    { path: "add-feature/edit/:featureId", component: AddFeatureComponent },
    { path: "feature-details/:id", component: FeatureDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FeatureRoutingModule { }
