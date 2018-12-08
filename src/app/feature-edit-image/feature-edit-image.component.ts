import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';

@Component({
  selector: 'ns-edit-image',
  templateUrl: './feature-edit-image.component.html',
  styleUrls: ['./feature-edit-image.component.css'],
  moduleId: module.id,
})
export class FeatureEditImageComponent implements OnInit {
    private imageId: string;
    public imageUrl: string;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute) { }
    
    ngOnInit() {
        this.imageId = this.activatedRoute.snapshot.params.imageId;
        Kinvey.Files.stream(this.imageId).then(file => {
            this.imageUrl = file._downloadURL;
        });
    }

    deleteImage(){
        Kinvey.Files.removeById(this.imageId).then(() => {
            var imageDataStore =  Kinvey.DataStore.collection<any>("featureImages", Kinvey.DataStoreType.Network);
            var query = new Kinvey.Query();
            query.equalTo("imageId", this.imageId);
            imageDataStore.remove(query).then(()=> {
                this.routerExtensions.back();
            });
            
        });
    }
}