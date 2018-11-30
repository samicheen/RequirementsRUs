import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

const metadata = require("./add-feature-form.metadata.json");

@Component({
  selector: 'ns-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css'],
  moduleId: module.id,
})
export class AddFeatureComponent implements OnInit {
  private itemId: string;
  public buttonText: string;
  public item: any;
  public metadata: any;
  public selectedIndex = 1;
  public values: Array<string> = ["Hi", "Bye"];

  @ViewChild("featureFormObject") radDataForm: any;
  
  constructor(private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.params.id;

    const emptyItem = {
      name: "",
      dueDate: "",
      sponsor: "",
      status: "",
      budget: 0,
      description: "",
      score: 0,
    };
    this.metadata = metadata;
    if (this.itemId) {
      var dataStore = Kinvey.DataStore.collection('features', Kinvey.DataStoreType.Network);
      this.item = dataStore.findById(this.itemId).toPromise();
      this.buttonText = "Edit";
    } else {
      this.item = of(emptyItem);
      this.buttonText = "Add";
    }
  }

  public onchange(args: SelectedIndexChangedEventData) {
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
  }

  addFeature(item) {
    console.log(item);
    this.radDataForm.dataForm.validateAll()
      .then(result => {
        if (!result) return;
  
        this.item = null;
        Kinvey.DataStore.collection("features").save(item)
          .then(() => this.routerExtensions.back());
      });
  }

}
