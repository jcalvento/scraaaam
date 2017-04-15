import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject'

@Injectable()
export default class ProjectService {  
  constructor(http) {
    this.http = http;
    this._projects = (new ReplaySubject(1)).asObservable();
    this.http.get("/projects").toPromise()
      .then(response => { this._projects.next(response.json()); })
      .catch(err => console.log(err));
  }

  get projects() { this._projects; }

  create(project) {
    this._post('/project', project, (response) => this._addProject(response.json()))
  }
  
   createMilestone(project, milestone) {
     this._post(`/project/${project._id}/milestone`, milestone, (response) => {
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
}

ProjectService.parameters = [Http];
