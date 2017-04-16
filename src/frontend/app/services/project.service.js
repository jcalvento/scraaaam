import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export default class ProjectService {  
  constructor(http) {
    this.http = http
    this._projects = new BehaviorSubject([])
    this._selectedProject = new BehaviorSubject({})
    this._selectedMilestone = new BehaviorSubject({})

    this._loadInitialData()
  }

  get projects() { return this._projects }
  get selectedProject() { return this._selectedProject }
  get selectedMilestone() { return this._selectedMilestone }

  createProject(project) {
    this._post('/project', project, (response) => this._concatToSubject(this._projects, response.json()))
  }

  selectProject(project) { this._selectedProject.next(project) }
  
  createMilestone(milestone) {
    let project = this._selectedProject.getValue()
    this._post(`/project/${project._id}/milestone`, milestone, (response) => {
      let project = this._selectedProject.getValue()
      project.milestones.push(response.json())
      this._selectedProject.next(project)
    })
  }

  selectMilestone(milestone) { this._selectedMilestone.next(milestone) }

  // Private methods
  _post(path, objectData, thenCallback) {
    this.http.post(path, JSON.stringify(objectData), { headers:{'Content-Type': 'application/json'} })
      .toPromise()
      .then(thenCallback)
      .catch(err => console.log(err))
  }

  _concatToSubject(subject, newElements) {
    debugger
    return subject.next(subject.getValue().push(newElements))
  }

  _loadInitialData() {
    this.http.get("/projects").toPromise()
      .then(response => { 
        this._projects.next(response.json())
        this._selectedProject.next(this._projects.getValue()[0])
        this._selectedMilestone.next(this._selectedProject.getValue()[0])
      })
      .catch(err => console.log(err))
  }
}

ProjectService.parameters = [Http]
