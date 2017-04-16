import 'reflect-metadata'
import 'zone.js'
import 'rxjs/add/operator/toPromise'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import AppComponent from './app/components/app.component'
import NewProjectComponent from './app/components/newProject.component'
import ProjectSelectionComponent from './app/components/projectSelection.component'
import NewMilestoneComponent from "./app/components/newMilestone.component";
import ProjectComponent from "./app/components/project.component";
import NewEpicComponent from "./app/components/newEpic.component";

@NgModule({
  imports: [ NgbModule.forRoot(), BrowserModule, FormsModule, HttpModule ],
  declarations: [
    AppComponent, NewProjectComponent, ProjectSelectionComponent, ProjectComponent, NewMilestoneComponent, NewEpicComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
