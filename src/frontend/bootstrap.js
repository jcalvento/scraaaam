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

@NgModule({
  imports: [ NgbModule.forRoot(), BrowserModule, FormsModule, HttpModule ],
  styleUrls: ['./style.css'],
  declarations: [ AppComponent, NewProjectComponent ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
