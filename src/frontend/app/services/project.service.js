import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {
  constructor(http) {
    this.http = http;
    this._projects = [];
    this.http.get("/projects").toPromise()
      .then(response => this._projects.push(...response.json()))
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
      .then(response => this._addProject(response.json()))
      .catch(err => console.log(err))
  }

  selectProject(projectId) {
    this.http.put(`/projects/${projectId}/select`).toPromise()
      .then(response => {
        const data = response.json();
        this._updateProject(data);

        return data
      })
  }

  _updateProject(projectData) {
    const project = this._projects.find(project => project._id === projectData._id);
    project.selected = projectData.selected;
  }
}

ProjectService.parameters = [Http];
