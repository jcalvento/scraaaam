import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const NewProjectView = require('./newProject.html');

@Component({ selector: 'newProject', template: NewProjectView })
export default class NewProjectComponent {
  constructor(modalService, projectService) {
    this.data = {};
    this.modalService = modalService;
    this.projectService = projectService
  }

  open(content) {
    this.modalService.open(content)
  }

  onSubmit() {
    this.projectService.create(this.data);
    this.data = {}
  }
}

NewProjectComponent.parameters = [NgbModal, ProjectService];
