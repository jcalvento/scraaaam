import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EpicService from "../services/epic.service";
const newCommentView = require('../views/newComment.html');

@Component({ selector: 'newComment', providers: [EpicService], inputs: ['epic'], template: newCommentView })
export default class NewCommentComponent {
  constructor(modalService, epicService) {
    this.data = {};
    this.modalService = modalService;
    this.epicService = epicService;
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit(epic) {
    this.epicService.createComment(epic, this.data).then((comment) => epic.comments.push(comment));
    this.data = {};
    this.currentModal.close()
  }
}

NewCommentComponent.parameters = [NgbModal, EpicService];
