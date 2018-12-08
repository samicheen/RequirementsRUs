import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";

@Component({
  selector: 'ns-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  moduleId: module.id,
})
export class ProjectDetailsComponent {

  public item: any;

  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute, private page: Page) {
                this.page.on(Page.navigatingToEvent, () => {
                  this.onLoad();
                });
  }

  onLoad() {
    this.item = Kinvey.DataStore.collection("projects", Kinvey.DataStoreType.Network)
    .findById(this.activatedRoute.snapshot.params.id).toPromise();
  }

  public editProjectTapped(itemId: string) {
    this.routerExtensions.navigate(['add-project', itemId]);
  }

  onButtonTap(itemId: string): void {
    this.routerExtensions.navigate(['features', itemId]);
  }

}
