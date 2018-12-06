import { Component, OnInit } from '@angular/core';
import { Kinvey } from 'kinvey-nativescript-sdk';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
  selector: 'ns-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  moduleId: module.id,
})
export class FeaturesComponent implements OnInit {
  public features: Array<any> = [];
  public projectId: string;
  constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
      // Use the component constructor to inject providers.
  }
  ngOnInit(): void {
      // Init your component properties here.
      this.projectId = this.activatedRoute.snapshot.params.id;
      var dataStore = Kinvey.DataStore.collection('features', Kinvey.DataStoreType.Network);
      var query = new Kinvey.Query();
      query.equalTo('projectId', this.projectId);
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
