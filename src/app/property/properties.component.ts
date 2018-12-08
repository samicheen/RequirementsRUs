import { Component, OnInit } from '@angular/core';
import { Kinvey } from 'kinvey-nativescript-sdk';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import {Page} from "ui/page";
import { alert } from "ui/dialogs/dialogs";

@Component({
  selector: 'ns-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
  moduleId: module.id,
})

export class PropertiesComponent {
  public properties: Array<any> = [];
  public featureId: string;
  constructor(private routerExtensions: RouterExtensions, 
    private activatedRoute: ActivatedRoute, private page: Page) {
    this.page.on(Page.navigatingToEvent, () => {
      this.onLoad();
    });
  }


  onLoad() {
      // Init your component properties here.
      this.featureId = this.activatedRoute.snapshot.params.id;
      var dataStore = Kinvey.DataStore.collection('properties', Kinvey.DataStoreType.Network);
      var query = new Kinvey.Query();
      query.equalTo('featureId', this.featureId);
      query.ascending('name');
      dataStore.find(query).subscribe(properties => {
          this.properties = properties;
      });
  }

  

  addNewProperty() {
      this.routerExtensions.navigate(["add-property", this.featureId]);
  }
  
  async saveProperties(properties){
      properties.forEach(async function(property) {
          var dataStore = Kinvey.DataStore.collection('properties', Kinvey.DataStoreType.Network);
          property.weight = parseInt(property.weight);
          await dataStore.save(property);
      });

      var totalScore = 0;
      properties.forEach( function(property) {
        property.weight = parseInt(property.weight);
        totalScore += property.weight * property.score;
      });
      totalScore /= 100;
      totalScore = parseFloat(totalScore.toFixed(2));
      var dataStore = Kinvey.DataStore.collection<any>('features', Kinvey.DataStoreType.Network);
      var feature = await dataStore.findById(this.featureId).toPromise();
      feature.score = totalScore;
      await dataStore.save(feature);
      
      var projectId = feature.projectId;
      var query = new Kinvey.Query();
      query.equalTo('projectId', projectId);
      var features = await dataStore.find(query).toPromise();

      var totalProjectScore = 0;
      features.forEach(function(feature){
            totalProjectScore += feature.score;
      });

      var projectDataStore = Kinvey.DataStore.collection<any>('projects', Kinvey.DataStoreType.Network);
      var project = await projectDataStore.findById(projectId).toPromise();
      project.score =  totalProjectScore;
      projectDataStore.save(project).then(() => this.alert("Parameters saved successfully"));

  }

  private alert(message: string) {
    return alert({
      title: "",
      okButtonText: "OK",
      message: message
    });
  }

}
