import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import EpicService from "../services/epic.service";
const newArtifactView = require('../views/newArtifact.html');

@Component({ selector: 'newComment', providers: [EpicService], inputs: ['epic'], template: newArtifactView })
export default class NewCommentComponent {
  constructor(modalService, epicService) {
    this.artifact = 'Comentario';
    this.data = {};
    this.attribute = 'body';
    this.modalService = modalService;
    this.epicService = epicService;
  }

  open(content) {
    this.currentModal = this.modalService.open(content)
  }

  onSubmit() {
    this.epicService.createComment(this.epic, this.data).then((comment) => this.epic.comments.push(comment));
    this.data = {};
    this.currentModal.close()
  }
}

NewCommentComponent.parameters = [NgbModal, EpicService];
