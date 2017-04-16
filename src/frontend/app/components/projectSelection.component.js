import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
const ProjectSelectionView = require('../views/projectSelection.html');

@Component({ selector: 'projectSelection', template: ProjectSelectionView })
export default class ProjectSelectionComponent {
  constructor(projectService) {
    this.projectService = projectService;
  }

  isSelected(project) {
    return this.selectedProject._id === project._id;
  }

  onInput(selectedProjectId) {
    let newSelectedProject = this.projects.find(project => project._id === selectedProjectId);
    
    this.projectService.selectProject(newSelectedProject);
  }

  ngOnInit() {
    this.projectSub = this.projectService.projects.subscribe(projects => this.projects = projects);
    this.selectedProjectSub = this.projectService.selectedProject.subscribe(project => this.selectedProject = project)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

ProjectSelectionComponent.parameters = [ProjectService];
