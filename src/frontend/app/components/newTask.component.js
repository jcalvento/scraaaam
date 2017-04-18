import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EpicService from "../services/epic.service";
const newTaskView = require('../views/newTask.html');

@Component({ selector: 'newTask', providers: [EpicService], inputs: ['epic'], template: newTaskView })
export default class NewTaskComponent {
  constructor(modalService, epicService) {
    this.data = {};
    this.modalService = modalService;
    this.epicService = epicService
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit(epic) {
    this.epicService.createTask(epic, this.data).then((task) => epic.tasks.push(task));
    this.data = {};
    this.currentModal.close()
  }
}

NewTaskComponent.parameters = [NgbModal, EpicService];
