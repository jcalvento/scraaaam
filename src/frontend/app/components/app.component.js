import { Component } from '@angular/core'

@Component({
  selector: 'app-view',
  template: '<h1>{{name}}</h1><br><newProject></newProject>'
})
export default class AppComponent {
  constructor() {
    this.name = 'Scraaaam'
  }
}
