import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { FeatureRoutingModule } from "./feature-routing.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { FeaturesComponent } from "./features.component";
import { AddFeatureComponent } from "../add-feature/add-feature.component";
import { FeatureDetailsComponent } from "../feature-details/feature-details.component";
import { FeatureImagesComponent } from '../feature-images/feature-images.component';
import { FeatureEditImageComponent } from '../feature-edit-image/feature-edit-image.component';



@NgModule({
  declarations: [
    FeaturesComponent,
    AddFeatureComponent,
    FeatureDetailsComponent,
    FeatureImagesComponent,
    FeatureEditImageComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule,
    FeatureRoutingModule,
    NativeScriptUIListViewModule,
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FeatureModule { }
