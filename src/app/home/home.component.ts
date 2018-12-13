import { Component, OnInit } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";
import {Page} from "ui/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    public projects: Array<any> = [];
    constructor(private routerExtensions: RouterExtensions, private page: Page) {
        this.page.on(Page.navigatingToEvent, () => {
          this.onLoad();
        });
    }

    ngOnInit() {
        this.onLoad();
    }

    onLoad() {
        // Init your component properties here.
        var dataStore = Kinvey.DataStore.collection('projects', Kinvey.DataStoreType.Network);
        var query = new Kinvey.Query();
        query.descending('score');
        dataStore.find(query).subscribe(projects => {
            this.projects = projects;
        });
    }

    addNewProject() {
        this.routerExtensions.navigate(["/add-project"]);
    }

    onItemTap(args: ListViewEventData) {
    	const item = args.view.bindingContext;
    	this.routerExtensions.navigate(
    		["/project-details", item._id]
    	);	
    }
    
}
