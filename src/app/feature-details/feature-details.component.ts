import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.css'],
  moduleId: module.id,
})
export class FeatureDetailsComponent implements OnInit {

  public item: any;

  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.item = Kinvey.DataStore.collection("features", Kinvey.DataStoreType.Network)
    .findById(this.activatedRoute.snapshot.params.id).toPromise();
  }

  public editFeatureTapped(itemId: string) {
    console.log(itemId);
    this.routerExtensions.navigate(['add-feature', itemId]);
  }

  onButtonTap(itemId: string): void {
    this.routerExtensions.navigate(['parameters', itemId]);
  }

}
