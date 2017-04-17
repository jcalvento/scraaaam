import { Component } from '@angular/core';
import ProjectService from "../services/project.service";
import { Subscription } from 'rxjs/Subscription';
const ProjectView = require('../views/project.html');

@Component({ selector: 'project', template: ProjectView })
export default class ProjectComponent {
  constructor(projectService) {
    this.projectService = projectService;
  }

  selectMilestone(milestone) {
    this.projectService.selectMilestone(milestone)
  }

  ngOnInit() {
    this.projectSub = this.projectService.selectedProject.subscribe((project) => this.project = project)
    this.milestoneSub = this.projectService.selectedMilestone.subscribe((milestone) => { this.selectedMilestone = milestone })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

ProjectComponent.parameters = [ProjectService];
