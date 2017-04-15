import { Component } from '@angular/core'
import ProjectService from "../services/project.service";
import { Subscription } from 'rxjs/Subscription';
import AppView from "../views/app.html";

@Component({ selector: 'app-view', template: AppView, providers: [ProjectService], styleUrls: ['../../assets/app.component.css'] })
export default class AppComponent {
  constructor(projectService) {
    this.name = 'Scraaaam';
    this.projectService = projectService
  }

  onInput(selectedProject) {
    this.selectedProject = selectedProject;
  }

  isSelectedProject(project) {
    project._id === this.selectedProject._id;
  }

  ngOnInit() {
    this.subscription = this.projectService.projects.subscribe((projects) => {
      this.projects = projects;
      if (!this.selectedProject) { this.selectedProject = this.projects[0] };
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

AppComponent.parameters = [ProjectService];