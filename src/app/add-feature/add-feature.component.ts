import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';
import * as geolocation from "nativescript-geolocation";
import { getCurrentLocation } from 'nativescript-geolocation';
import { Accuracy } from "tns-core-modules/ui/enums";
import { alert } from "ui/dialogs/dialogs";

@Component({
  selector: 'ns-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css'],
  moduleId: module.id,
})
export class AddFeatureComponent implements OnInit {
  private featureId: string;
  private projectId: string;
  public buttonText: string;
  public item: any;
  public selectedIndex = 1;
  public priorityValues: Array<string> = ["", "Must Have", "Should Have", "Nice to Have"];
  public statusValues: Array<string> = ["", "Done", "Work in Process", "Planned", "Not Planned"];

  @ViewChild("featureFormObject") radDataForm: any;
  
  constructor(private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.featureId = this.activatedRoute.snapshot.params.featureId;
    this.projectId = this.activatedRoute.snapshot.params.projectId;

    var emptyItem = {
      name: "",
      dueDate: "",
      priority: "",
      status: "",
      estimatedPrice: "",
      description: "",
      score: 0,
      projectId: "",
      location: new Object()
    };

    emptyItem.projectId = this.projectId;

    if (this.featureId) {
      var dataStore = Kinvey.DataStore.collection('features', Kinvey.DataStoreType.Network);
      this.item = dataStore.findById(this.featureId).toPromise();
      this.buttonText = "Edit";
    } else {
      this.item = of(emptyItem);
      this.buttonText = "Add";
    }
  }

  async addFeature(item) {
    var result = await this.radDataForm.dataForm.validateAll();
    if (!result) return;
    this.item = null;
    var feature = await Kinvey.DataStore.collection("features").save(item);
    if(feature){
        this.routerExtensions.back(); 
    }
  }

  async addLocation(item){
    var isEnabled = await geolocation.isEnabled();
    if (!isEnabled) {
        geolocation.enableLocationRequest();
    }
    var location = await getCurrentLocation({desiredAccuracy: Accuracy.high, timeout: 20000});
    if(location){
      item.location.latitude = location.latitude;
      item.location.longitude = location.longitude;
      if(this.buttonText === "Add")
        this.alert("Location added successfully");
      else
        this.alert("Location updated successfully");
    }
  }

  private alert(message: string) {
    return alert({
      title: "",
      okButtonText: "OK",
      message: message
    });
  }
}
