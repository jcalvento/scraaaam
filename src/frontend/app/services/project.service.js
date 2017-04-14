import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class ProjectService {
  constructor(http) {
    this.http = http;
    this._projects = [];
    this.http.get("/projects").toPromise()
      .then(response => {
        this._projects.push(...response.json());
        this._selectedProject = this.projects.find(project => project.selected)
      })
      .catch(err => console.log(err))
  }

  get projects() {
    return this._projects
  }

  get selectedProject() {
    return this._selectedProject
  }

  create(project) {
    this._post('/project', project, (response) => this._addProject(response.json()))
  }

  selectProject(projectId) {
    this.http.put(`/projects/${projectId}/select`).toPromise()
      .then(response => {
        const data = response.json();
        this._updateProject(data);

        return data
      })
  }

   createMilestone(milestone) {
     this._post(`/project/${this.selectedProject._id}/milestone`, milestone, (response) => {
       this._addMilestone(response.json())
     })
   }

  // Private methods
  _post(path, objectData, thenCallback) {
    this.http.post(path, JSON.stringify(objectData), { headers:{'Content-Type': 'application/json'} })
      .toPromise()
      .then(thenCallback)
      .catch(err => console.log(err))
  }

  _addMilestone(milestone) {
    this.selectedProject.milestones.push(milestone)
  }

  _addProject(project) {
    return this._projects.push(project)
  }

  _updateProject(projectData) {
    const project = this._projects.find(project => project._id === projectData._id);
    project.selected = projectData.selected;
    this._selectedProject = project
  }
}

ProjectService.parameters = [Http];
