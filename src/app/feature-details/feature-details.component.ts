import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";

@Component({
  selector: 'ns-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.css'],
  moduleId: module.id,
})
export class FeatureDetailsComponent {

  public item: any;
  public imageUrl: string = "";
  public featureId: string;

  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute, private page: Page) {
                this.page.on(Page.navigatingToEvent, () => {
                  this.onLoad();
                });
  }

  onLoad() {
    this.featureId = this.activatedRoute.snapshot.params.id;
    this.item = Kinvey.DataStore.collection("features", Kinvey.DataStoreType.Network)
    .findById(this.featureId).toPromise();
    
    var dataStore = Kinvey.DataStore.collection('properties', Kinvey.DataStoreType.Network);
      var query = new Kinvey.Query();
      query.equalTo('featureId', this.featureId);
      dataStore.find(query).subscribe(properties => {
          if(properties.length === 0) {
            this.addDefaultProperties();
          }
      });
  }

  async addDefaultProperties(){
    var properties = [{
        featureId: this.featureId,
        name: "Ease of Implementation",
        low: "Challenging",
        high: "Easy",
        weight: 100,
        score: 0
      },
      {
        featureId: this.featureId,
        name: "Investment of Money",
        low: "Expensive",
        high: "Cheap",
        weight: 100,
        score: 0
      },{
        featureId: this.featureId,
        name: "Brand Fit",
        low: "Erodes",
        high: "Strengthen",
        weight: 100,
        score: 0
      },{
        featureId: this.featureId,
        name: "Investment of Time/Training",
        low: "High",
        high: "Low",
        weight: 100,
        score: 0
      }];
      
      properties.forEach(async function(property) {
        await Kinvey.DataStore.collection("properties").save(property);
      });
  }

  public editFeatureTapped(itemId: string) {
    this.routerExtensions.navigate(['add-feature/edit', itemId]);
  }

  onButtonTap(featureId: string): void {
    this.routerExtensions.navigate(['properties', featureId]);
  }

  onImgButtonTap(featureId: string): void {
    this.routerExtensions.navigate(['feature-images', featureId]);
  }

}
