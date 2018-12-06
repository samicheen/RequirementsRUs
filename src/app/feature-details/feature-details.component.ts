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
    Kinvey.Files.download('3ecd97d9-aec9-4e09-8424-ba2630b7b538')
      .then((file: any) => {
        // const image = UIImage.imageWithData(fileData);
        var fileContent = file._downloadURL;
        console.log("**********************");
        console.log(fileContent);
      })
      .catch((error: Kinvey.BaseError) => {
        console.log("--------------------");
        console.log(error);
      });
    
  }

  public editFeatureTapped(itemId: string) {
    console.log(itemId);
    this.routerExtensions.navigate(['add-feature/edit', itemId]);
  }

  onButtonTap(itemId: string): void {
    this.routerExtensions.navigate(['properties', itemId]);
  }

}
