import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EpicService from "../services/epic.service";
const newArtifactView = require('../views/newArtifact.html');

@Component({ selector: 'newTask', providers: [EpicService], inputs: ['epic'], template: newArtifactView })
export default class NewTaskComponent {
  constructor(modalService, epicService) {
    this.attribute = 'description';
    this.artifact = 'Tarea';
    this.data = {};
    this.modalService = modalService;
    this.epicService = epicService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit(epic) {
    this.epicService.createTask(this.epic, this.data).then((task) => this.epic.tasks.push(task));
    this.data = {};
    this.currentModal.close()
  }
}

NewTaskComponent.parameters = [NgbModal, EpicService];
