import { Component } from '@angular/core'
import ProjectService from "../services/project.service";
const AppView = require('../views/app.html');

@Component({ selector: 'app-view', template: AppView, providers: [ProjectService], styleUrls: ['../../assets/styles.css'] })
export default class AppComponent {
  constructor() {
    this.name = 'Scraaaam'
  }
}

AppComponent.parameters = [ProjectService];