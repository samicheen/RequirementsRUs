import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { FeatureRoutingModule } from "./feature-routing.module";
import { FeaturesComponent } from "./features.component";
import { AddFeatureComponent } from "../add-feature/add-feature.component";
import { FeatureDetailsComponent } from "../feature-details/feature-details.component";

@NgModule({
  declarations: [
    FeaturesComponent,
    AddFeatureComponent,
    FeatureDetailsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    FeatureRoutingModule,
    NativeScriptUIListViewModule,
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FeatureModule { }
