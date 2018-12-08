import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import * as fs from "tns-core-modules/file-system";
import { path, knownFolders } from "tns-core-modules/file-system";
import { ImageSource } from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";
import {Page} from "ui/page";
import { alert } from "ui/dialogs/dialogs";

@Component({
  selector: 'ns-feature-images',
  templateUrl: './feature-images.component.html',
  styleUrls: ['./feature-images.component.css'],
  moduleId: module.id,
})
export class FeatureImagesComponent {

  public imageObjs: Array<any> = [];
  public featureId: string;
  constructor(private routerExtensions: RouterExtensions,
              private activatedRoute: ActivatedRoute, private page: Page) {
                this.page.on(Page.navigatingToEvent, () => {
                  this.onLoad();
                });
  }

  async onLoad(){
    var imageDataStore =  Kinvey.DataStore.collection<any>("featureImages", Kinvey.DataStoreType.Network);
    this.featureId = this.activatedRoute.snapshot.params.id;
    var query = new Kinvey.Query();
    query.equalTo("featureId", this.featureId);
    var images = await imageDataStore.find(query).toPromise();
    const pArray = images.map(async image => {
        const response = await Kinvey.Files.stream(image.imageId);
        var imageObj = {_id: image.imageId, url: response._downloadURL}
        return imageObj;
    });
    const imageObjs = await Promise.all(pArray);
    this.imageObjs = imageObjs;
  }

  async addImage() {
    const source = new ImageSource();
    camera.requestPermissions();
    var cameraOptions = {
        width: 250,
        height: 250,
        keepAspectRatio: false, 
        saveToGallery: false
    }
    var imageAsset = await camera.takePicture(cameraOptions);
    var imageSource = await source.fromAsset(imageAsset);
    const folderPath: string = knownFolders.documents().path;
    const fileName = "test.png";
    const filePath = path.join(folderPath, fileName);
    const saved: boolean = imageSource.saveToFile(filePath, "png");
    if (saved) {
        var imageFile = fs.File.fromPath(filePath);
        var fileContent = imageFile.readSync();
        var metadataTrue = {
            filename: imageFile.name,
            mimeType: 'image/jpeg',
            size: fileContent.length,
            public: true
        }
        var file = await Kinvey.Files.upload(imageFile, metadataTrue);
        var imageDataStore =  Kinvey.DataStore.collection<any>("featureImages", Kinvey.DataStoreType.Network);
        var image = {
            featureId: this.featureId,
            imageId: file._id
        };
        imageDataStore.save(image).then(async () => {
          var fileDetails = await Kinvey.Files.stream(file._id);
          var imageObj = { _id: file._id, url: fileDetails._downloadURL };
          this.imageObjs.push(imageObj);
          this.alert("Image added successfully");
        });
    }
  }

  editImage(imageObj){
    this.routerExtensions.navigate(['feature-edit-image', imageObj._id]);
  }

  private alert(message: string) {
    return alert({
      title: "",
      okButtonText: "OK",
      message: message
    });
  }

}
