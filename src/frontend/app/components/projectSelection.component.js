import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectSelectionView = require('../views/projectSelection.html');

@Component({ selector: 'projectSelection', template: ProjectSelectionView })
export default class ProjectSelectionComponent {
  constructor(projectService) {
    this.projectService = projectService;
    this.projects = projectService.projects;
  }
}

ProjectSelectionComponent.parameters = [ProjectService];
