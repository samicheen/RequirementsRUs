import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AddFeatureComponent } from "../add-feature/add-feature.component";
import { FeaturesComponent } from "./features.component";
import { FeatureDetailsComponent } from "../feature-details/feature-details.component";
import { FeatureImagesComponent } from "../feature-images/feature-images.component";
import { FeatureEditImageComponent } from "../feature-edit-image/feature-edit-image.component";

const routes: Routes = [
    // { path: "", redirectTo: "features/:id" },
    { path: "features/:id", component: FeaturesComponent },
    { path: "add-feature/add/:projectId", component: AddFeatureComponent },
    { path: "add-feature/edit/:featureId", component: AddFeatureComponent },
    { path: "feature-details/:id", component: FeatureDetailsComponent },
    { path: "feature-images/:id", component: FeatureImagesComponent },
    { path: "feature-edit-image/:imageId", component: FeatureEditImageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FeatureRoutingModule { }
