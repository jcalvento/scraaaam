import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectView = require('../views/project.html');

@Component({ selector: 'project', template: ProjectView, inputs: ['project'] })
export default class ProjectComponent {
  constructor(projectService) {
    this.projectService = projectService;
  }

  selectMilestone(milestone) {
    this.selectedMilestone = milestone;
  }
}

ProjectComponent.parameters = [ProjectService];
