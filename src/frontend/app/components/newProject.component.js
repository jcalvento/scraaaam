import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const NewProjectView = require('../views/newProject.html');

@Component({ selector: 'newProject', template: NewProjectView })
export default class NewProjectComponent {
  constructor(modalService, projectService) {
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.create(this.data);
    this.data = {};
    this.currentModal.close()
  }
}

NewProjectComponent.parameters = [NgbModal, ProjectService];
