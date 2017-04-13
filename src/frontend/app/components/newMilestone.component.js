import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const NewMilestoneView = require('../views/newMilestone.html');

@Component({ selector: 'newMilestone', template: NewMilestoneView })
export default class NewMilestoneComponent {
  constructor(modalService, projectService) {
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.createMilestone(this.data);
    this.data = {};
    this.modalService.close()
  }
}

NewMilestoneComponent.parameters = [NgbModal, ProjectService];
