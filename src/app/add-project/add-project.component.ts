import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { of } from "rxjs";
import { Kinvey } from 'kinvey-nativescript-sdk';

const metadata = require("./add-project-form.metadata.json");

@Component({
  selector: 'ns-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  moduleId: module.id,
})
export class AddProjectComponent implements OnInit {
  private itemId: string;
  public buttonText: string;
  public item: any;
  public metadata: any;

  @ViewChild("formObject") radDataForm: any;
  
  constructor(private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.itemId = this.activatedRoute.snapshot.params.id;

    const emptyItem = {
      name: "",
      dueDate: "",
      sponsor: "",
      status: "",
      budget: 0,
      description: "",
      score: 0,
    };
    this.metadata = metadata;
    if (this.itemId) {
      var dataStore = Kinvey.DataStore.collection('projects', Kinvey.DataStoreType.Network);
      this.item = dataStore.findById(this.itemId).toPromise();
      this.buttonText = "Edit";
    } else {
      this.item = of(emptyItem);
      this.buttonText = "Add";
    }
  }

  addProject(item) {
    console.log(item);
    this.radDataForm.dataForm.validateAll()
      .then(result => {
        if (!result) return;
  
        this.item = null;
        Kinvey.DataStore.collection("projects").save(item)
          .then(() => this.routerExtensions.navigate(['/home'], { clearHistory: true }));
      });
  }

}
