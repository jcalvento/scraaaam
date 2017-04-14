import { Component } from '@angular/core'
import ProjectService from "../services/project.service";
import AppView from "../views/app.html";

@Component({ selector: 'app-view', template: AppView, providers: [ProjectService], styleUrls: ['../../assets/app.component.css'] })
export default class AppComponent {
  constructor(projectService) {
    this.name = 'Scraaaam';
    this.projectService = projectService;
    projectService.projects().then((projects) => { 
      this.projects = projects;
      this.selectedProject = this.projects[0]; 
    })
  }

  onInput(selectedProject) {
    this.selectedProject = selectedProject;
  }

  isSelectedProject(project) {
    project._id === this.selectedProject._id;
  }
}

AppComponent.parameters = [ProjectService];