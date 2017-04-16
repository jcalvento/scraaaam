import { Component } from '@angular/core'
import ProjectService from "../services/project.service";
import AppView from "../views/app.html";

@Component({ selector: 'app-view', template: AppView, providers: [ProjectService], styleUrls: ['../../assets/app.component.css'] })
export default class AppComponent {
  constructor(projectService) { this.name = 'Scraaaam'; }
}

AppComponent.parameters = [ProjectService];