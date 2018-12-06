import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';
import * as fs from "tns-core-modules/file-system";
import { path, knownFolders } from "tns-core-modules/file-system";
import { ImageSource } from "tns-core-modules/image-source";
import * as camera from "nativescript-camera";

@Component({
  selector: 'ns-add-feature',
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css'],
  moduleId: module.id,
})
export class AddFeatureComponent implements OnInit {
  private featureId: string;
  private projectId: string;
  public buttonText: string;
  public item: any;
  public selectedIndex = 1;
  public priorityValues: Array<string> = ["", "Must Have", "Should Have", "Nice to Have"];
  public statusValues: Array<string> = ["", "Done", "Work in Process", "Planned", "Not Planned"];

  @ViewChild("featureFormObject") radDataForm: any;
  
  constructor(private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.featureId = this.activatedRoute.snapshot.params.featureId;
    this.projectId = this.activatedRoute.snapshot.params.projectId;

    var emptyItem = {
      name: "",
      dueDate: "",
      priority: "",
      status: "",
      estimatedPrice: "",
      description: "",
      score: 0,
      projectId: ""
    };

    emptyItem.projectId = this.projectId;

    if (this.featureId) {
      var dataStore = Kinvey.DataStore.collection('features', Kinvey.DataStoreType.Network);
      this.item = dataStore.findById(this.featureId).toPromise();
      this.buttonText = "Edit";
    } else {
      this.item = of(emptyItem);
      this.buttonText = "Add";
    }
  }

  addImage() {
    const source = new ImageSource();
    camera.requestPermissions();
    camera.takePicture()
        .then(function (imageAsset) {
          source.fromAsset(imageAsset)
          .then((imageSource: ImageSource) => {
              const folderPath: string = knownFolders.documents().path;
              const fileName = "test.png";
              const filePath = path.join(folderPath, fileName);
              console.log(filePath);
              const saved: boolean = imageSource.saveToFile(filePath, "png");
              if (saved) {
                  console.log("Image saved successfully!");
                  console.log("Result is an image asset instance");
                  console.dir(imageAsset);
                  
                  console.log('Uploading image');
                  console.log('exists: ' + fs.File.exists(filePath));

                  var imageFile = fs.File.fromPath(filePath);
                  console.dir(imageFile);
                  var fileContent = imageFile.readSync();

                  var metadataTrue = {
                      filename: imageFile.name,
                      mimeType: 'image/jpeg',
                      size: fileContent.length,
                      public: true
                  }
                  console.log(metadataTrue);
                  Kinvey.Files.upload(imageFile, metadataTrue)
                      .then(function (file) {
                          console.log('File uploaded');
                          console.log(JSON.stringify(file));
                      })
                      .catch(function (error) {
                          console.log('Upload error: ' + error.message);
                      });
              }
            });
            
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
  }

  addFeature(item) {
    this.radDataForm.dataForm.validateAll()
      .then(result => {
        if (!result) return;
  
        this.item = null;
        Kinvey.DataStore.collection("features").save(item)
          .then(() => this.routerExtensions.navigate(['/features', this.projectId]));
      });
  }

}
