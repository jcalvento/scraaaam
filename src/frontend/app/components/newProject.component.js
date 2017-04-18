import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const NewArtifactView = require('../views/newArtifact.html');

@Component({ selector: 'newProject', template: NewArtifactView })
export default class NewProjectComponent {
  constructor(modalService, projectService) {
    this.attribute = 'name';
    this.artifact = 'Project';
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.createProject(this.data);
    this.data = {};
    this.currentModal.close()
  }
}

NewProjectComponent.parameters = [NgbModal, ProjectService];
