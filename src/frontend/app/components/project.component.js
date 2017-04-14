import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectView = require('../views/project.html');

@Component({ selector: 'project', template: ProjectView })
export default class ProjectComponent {
  constructor(projectService) {
    this.projectService = projectService;
  }

}

ProjectComponent.parameters = [ProjectService];
