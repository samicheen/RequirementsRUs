import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';

@Component({
  selector: 'ns-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  moduleId: module.id,
})
export class AddPropertyComponent implements OnInit {
  private featureId: string;
  public item: any;

  @ViewChild("propertyFormObject") radDataForm: any;
  
  constructor(private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.featureId = this.activatedRoute.snapshot.params.id;

    const emptyItem = {
      featureId: this.featureId,
      name: "",
      low: "",
      high: "",
      weight: 0,
      score: 0
    };
    
    this.item = of(emptyItem);
  }

  addProperty(item) {
    console.log(item);
    this.radDataForm.dataForm.validateAll()
      .then(result => {
        if (!result) return;
        this.item = null;
        Kinvey.DataStore.collection("properties").save(item)
          .then(() => this.routerExtensions.back());
      });
  }

}
