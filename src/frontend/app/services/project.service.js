import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {
  constructor(http) {
    this.http = http;
    this._projects = [];
    this.http.get("/projects").toPromise()
      .then(response => this._addProject(...response.json()))
      .catch(err => console.log(err))
  }

  _addProject(project) {
    return this._projects.push(project);
  }

  get projects() {
    return this._projects
  }

  create(project) {
    this.http.post("/project", JSON.stringify(project), { headers:{'Content-Type': 'application/json'} })
      .toPromise()
      .then(response => this._addProject(project))
      .catch(err => console.log(err))
  }
}

ProjectService.parameters = [Http];
