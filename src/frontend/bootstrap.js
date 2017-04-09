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

@NgModule({
  imports: [ NgbModule.forRoot(), BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, NewProjectComponent, ProjectSelectionComponent ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
