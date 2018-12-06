import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { PropertyRoutingModule } from "./property-routing.module";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { PropertiesComponent } from './properties.component';

@NgModule({
  declarations: [
    PropertiesComponent
  ],
  imports: [
    // NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule,
    PropertyRoutingModule,
    NativeScriptUIListViewModule,
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PropertyModule { }
