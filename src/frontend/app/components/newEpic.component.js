import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectService from "../services/project.service";
const newEpicView = require('../views/newEpic.html');

@Component({ selector: 'newEpic', template: newEpicView })
export default class NewEpicComponent {
  constructor(modalService, projectService) {
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

NewMilestoneComponent.parameters = [NgbModal, ProjectService];
