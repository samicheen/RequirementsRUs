import { Component, OnInit } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    public projects: Array<any> = [];
    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }
    ngOnInit(): void {
        // Init your component properties here.
        var dataStore = Kinvey.DataStore.collection('projects', Kinvey.DataStoreType.Network);
        dataStore.find().subscribe(projects => {
            this.projects = projects;
        });
    }
    addNewProject() {
        this.routerExtensions.navigate(["/add-project"]);
    }
    public onItemTap(args: ListViewEventData) {
    	const item = args.view.bindingContext;
    	this.routerExtensions.navigate(
    		["/project-details", item._id]
    	);
    	
    }
    
}
