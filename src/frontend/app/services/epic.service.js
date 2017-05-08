import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

@Injectable()
export default class EpicService {  
  constructor(http) {
    this.http = http;
  }

  getEpic(epicId) {
    return this.http.get(`/epics/${epicId}`).toPromise().then(response => response.json());
  }

  createComment(epic, comment) {
    return this.http.post(`/epics/${epic._id}/comment`, JSON.stringify(comment), { headers: {'Content-Type': 'application/json'} })
      .toPromise()
      .then((comment) => comment.json())
      .catch(err => console.log(err))
  }

  createTask(epic, task) {
    return this.http.post(`/epics/${epic._id}/task`, JSON.stringify(task), { headers: {'Content-Type': 'application/json'} })
      .toPromise()
      .then((task) => task.json())
      .catch(err => console.log(err))
  }

  deleteTask(task) {
    return this.http.delete(`/tasks/${task._id}`, { headers: {'Content-Type': 'application/json'} })
      .toPromise()
      .then((task) => task.json())
      .catch(err => console.log(err))
  }
}

EpicService.parameters = [Http];
