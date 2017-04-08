import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const newProjectView = require('./newProject.html');

@Component({ selector: 'newProject', template: newProjectView })
export default class NewProjectComponent {
  constructor(modalService) {
    this.modalService = modalService
  }

  open(content) {
    this.modalService.open(content)
  }
}

NewProjectComponent.parameters = [NgbModal];
