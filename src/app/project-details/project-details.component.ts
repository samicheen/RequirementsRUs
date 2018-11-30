import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  moduleId: module.id,
})
export class ProjectDetailsComponent implements OnInit {

  public item: any;

  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.item = Kinvey.DataStore.collection("projects", Kinvey.DataStoreType.Network)
    .findById(this.activatedRoute.snapshot.params.id).toPromise();
  }

  public editProjectTapped(itemId: string) {
    console.log(itemId);
    this.routerExtensions.navigate(['add-project', itemId]);
  }

  onButtonTap(itemId: string): void {
    this.routerExtensions.navigate(['features', itemId]);
  }

}
