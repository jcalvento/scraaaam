import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectView = require('../views/project.html');

@Component({ selector: 'project', template: ProjectView })
export default class NewProjectComponent {
  constructor(projectService) {
    this.projectService = projectService;
    this.project = projectService.selectedProject
  }
}

NewProjectComponent.parameters = [ProjectService];
