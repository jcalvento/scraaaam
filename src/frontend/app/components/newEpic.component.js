import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const newArtifactView = require('../views/newArtifact.html');

@Component({ selector: 'newEpic', template: newArtifactView })
export default class NewEpicComponent {
  constructor(modalService, projectService) {
    this.artifact = 'Epica';
    this.attribute = 'name';
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.createEpic(this.data);
    this.data = {};
    this.currentModal.close()
  }
}

NewEpicComponent.parameters = [NgbModal, ProjectService];
