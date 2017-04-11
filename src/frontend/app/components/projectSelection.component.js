import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectSelectionView = require('../views/projectSelection.html');

@Component({ selector: 'projectSelection', template: ProjectSelectionView, inputs: ['projects'] })
export default class ProjectSelectionComponent {
  constructor(projectService) {
    this.projectService = projectService;
    this.projects = this.projectService.projects;
    this.selectedProject = this.projects.find(project => project.selected)
  }

  onInput(selectedProject) {
    this.projectService.selectProject(selectedProject);
  }
}

ProjectSelectionComponent.parameters = [ProjectService];
