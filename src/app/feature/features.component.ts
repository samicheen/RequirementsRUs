import { Component, OnInit } from '@angular/core';
import { Kinvey } from 'kinvey-nativescript-sdk';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import {Page} from "ui/page";

@Component({
  selector: 'ns-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  moduleId: module.id,
})
export class FeaturesComponent {
  public features: Array<any> = [];
  public projectId: string;
  constructor(private routerExtensions: RouterExtensions, 
    private activatedRoute: ActivatedRoute, private page: Page) {
      this.page.on(Page.navigatingToEvent, () => {
        this.onLoad();
      });
  }
  
  onLoad() {
      // Init your component properties here.
      this.projectId = this.activatedRoute.snapshot.params.id;
      var dataStore = Kinvey.DataStore.collection('features', Kinvey.DataStoreType.Network);
      var query = new Kinvey.Query();
      query.equalTo('projectId', this.projectId);
      query.descending('score');
      dataStore.find(query).subscribe(features => {
          this.features = features;
      });
  }

  addNewFeature() {
      this.routerExtensions.navigate(["/add-feature/add", this.projectId]);
  }
  
  public onItemTap(args: ListViewEventData) {
    const item = args.view.bindingContext;
    this.routerExtensions.navigate(
      ["/feature-details", item._id]
    );
    
  }

}
