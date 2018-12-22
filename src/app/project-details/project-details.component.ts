import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";
import { confirm } from 'tns-core-modules/ui/dialogs';

@Component({
  selector: 'ns-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  moduleId: module.id,
})
export class ProjectDetailsComponent {

  public item: any;
  public projectId: string;

  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute, private page: Page) {
                this.page.on(Page.navigatingToEvent, () => {
                  this.onLoad();
                });
  }

  onLoad() {
    this.projectId = this.activatedRoute.snapshot.params.id;
    this.item = Kinvey.DataStore.collection("projects", Kinvey.DataStoreType.Network)
    .findById(this.projectId).toPromise();
  }

  public editProjectTapped(itemId: string) {
    this.routerExtensions.navigate(['add-project', itemId]);
  }

  onButtonTap(itemId: string): void {
    this.routerExtensions.navigate(['features', itemId]);
  }

  async deleteProject(item) {
    var dataStore = Kinvey.DataStore.collection('projects', Kinvey.DataStoreType.Network);
    var options = {
      message: "Are you sure you want to delete this project?",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    };
    var result = await confirm(options);
    if(result){
      item.deleted = 1;
      dataStore.save(item).then(() => this.routerExtensions.back());
    }
  }

}
