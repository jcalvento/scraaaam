import { Component } from '@angular/core';
import EpicService from "../services/epic.service";
import { ActivatedRoute } from '@angular/router';
const EpicView = require('../views/epic.html');

@Component({ selector: 'epic', providers: [EpicService], template: EpicView })
export default class EpicComponent {
  constructor(route, epicService) {
    this.route = route;
    this.epicService = epicService;
  }

  ngOnInit() {
    this.epic = {};
    this.route.params.subscribe(params => {
      this.epicService.getEpic(params.id)
          .then(epic => this.epic = epic)
          .catch(e => console.log(e));
    });
  }

  deleteTask(task) {
    this.epicService.deleteTask(task).then((deletedTask) =>{
      this.epic.tasks = this.epic.tasks.filter(task => task._id !== deletedTask._id)
    });
  }
}

EpicComponent.parameters = [ActivatedRoute, EpicService];
