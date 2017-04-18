import { Component } from '@angular/core'
import ProjectService from "../services/project.service";
import AppView from "../views/app.html";

@Component({ 
  selector: 'app-view', template: AppView, providers: [ProjectService]
})
export default class AppComponent {
  constructor() { this.name = 'Scraaaam' }
}