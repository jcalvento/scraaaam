import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const NewArtifactView = require('../views/newArtifact.html');

@Component({ selector: 'newMilestone', template: NewArtifactView })
export default class NewMilestoneComponent {
  constructor(modalService, projectService) {
    this.attribute = 'name';
    this.artifact = 'Milestone';
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.createMilestone(this.data);
    this.data = {};
    this.currentModal.close()
  }
}

NewMilestoneComponent.parameters = [NgbModal, ProjectService];
