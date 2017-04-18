import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export default class ProjectService {  
  constructor(http) {
    this.http = http;
    this._projects = new BehaviorSubject([]);
    this._selectedProject = new BehaviorSubject({});
    this._selectedMilestone = new BehaviorSubject({});

    this._loadInitialData()
  }

  get projects() { return this._projects }
  get selectedProject() { return this._selectedProject }
  get selectedMilestone() { return this._selectedMilestone }

  createProject(project) {
    this._post('/project', project, (response) => {
      this._concatToSubject(this._projects, response.json());
      let projects = this._projects.getValue();
      if(projects.length === 1) {
        this._selectedProject.next(projects[0])
      }
    })
  }

  selectProject(project) {
    this._selectedProject.next(project);
    this._selectedMilestone.next(null)
  }

  createMilestone(milestone) {
    let project = this._selectedProject.getValue();
    this._post(`/project/${project._id}/milestone`, milestone, (response) => {
      let project = this._selectedProject.getValue();
      project.milestones.push(response.json());
      this._selectedProject.next(project)
    })
  }

  selectMilestone(milestone) { this._selectedMilestone.next(milestone) }

  createEpic(epic) {
    let selectedMilestone = this._selectedMilestone.getValue();
    this._post(`/milestone/${selectedMilestone._id}/epic`, epic, (response) =>{
      selectedMilestone.epics.push(response.json());
      this._selectedMilestone.next(selectedMilestone)
    })
  }

  // Private methods
  _post(path, objectData, thenCallback) {
    this.http.post(path, JSON.stringify(objectData), { headers:{'Content-Type': 'application/json'} })
      .toPromise()
      .then(thenCallback)
      .catch(err => console.log(err))
  }

  _concatToSubject(subject, newElements) {
    let existingElements = subject.getValue();
    existingElements.push(newElements);
    return subject.next(existingElements)
  }

  _loadInitialData() {
    this.http.get("/projects").toPromise()
      .then(response => { 
        this._projects.next(response.json());
        if(this._projects.getValue().length > 0) {
          let selectedProject = this._projects.getValue()[0];
          this._selectedProject.next(selectedProject);
          this._selectedMilestone.next(selectedProject.milestones[0])
        }
      })
      .catch(err => console.log(err))
  }
}

ProjectService.parameters = [Http];
