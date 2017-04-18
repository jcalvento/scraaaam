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
import NewCommentComponent from "./app/components/newComment.component";
import ProjectComponent from "./app/components/project.component";
import NewEpicComponent from "./app/components/newEpic.component";
import NewTaskComponent from "./app/components/newTask.component";
import EpicComponent from "./app/components/epic.component";

import { RouterModule }  from '@angular/router';

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectComponent },
  { path: 'epics/:id', component: EpicComponent }
], { useHash: true })

@NgModule({
  imports: [ router, NgbModule.forRoot(), BrowserModule, FormsModule, HttpModule ],
   styleUrls: ['./assets/application.css'],
  declarations: [
    AppComponent, NewProjectComponent, ProjectSelectionComponent, NewCommentComponent,
    ProjectComponent, NewMilestoneComponent, NewEpicComponent, EpicComponent, NewTaskComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
