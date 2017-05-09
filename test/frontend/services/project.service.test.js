import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"
import { stubPost, createResponse } from "../support/serviceHelpers"

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Http } from '@angular/http';

const should = chai.should()
chai.use(sinonChai)

import ProjectService from "../../../src/frontend/app/services/project.service"

describe("ProjectService", () => {
  let projects = [
    { _id: "590761c5c00daf0caa9b881a", name: "Project 1", milestones: [] },
    { _id: "590761c5c00daf0caa9b881b", name: "Project 2", milestones: [] } 
  ]
  let service
  let http

  beforeEach(async() => {
    http = sinon.createStubInstance(Http)
    
    http.get.withArgs("/projects").callsFake(() => createResponse(projects));
    service = await new ProjectService(http)
  })

  it("Loads initial data from the server", () => {
    const currentProjects = service.projects.getValue()
    currentProjects.should.be.deep.equals(projects)
    service.selectedProject.getValue().should.equals(projects[0])
  })

  describe("#createProject", () => {
    it("invokes the backend to create the project", async() =>{
      const newProject = { name: 'New project' }
      const expectedPayload = JSON.stringify(newProject)
      const expectedURL = `/project`
      service.projects.next(projects)
      stubPost(http, expectedURL, expectedPayload, newProject)

      service.createProject(newProject)

      service.projects.getValue().should.be.deep.equals(projects)
      service.selectedProject.getValue().should.equals(projects[0])
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })

  describe("#createMilestone", () => {
    it("invokes the backend to create the project", async() =>{
      const project = projects[0]
      service.projects.next(project)
      const newMilestone = { name: 'Nueva milestone' }
      const expectedPayload = JSON.stringify(newMilestone)
      const expectedURL = `/project/${project._id}/milestone`
      stubPost(http, expectedURL, expectedPayload, newMilestone)

      await service.createMilestone(newMilestone)
      const updatedProject = service.selectedProject.getValue()

      updatedProject.milestones.should.have.lengthOf(1)
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })

  describe("#createEpic", () => {
    it("invokes the backend to create the project", async() =>{
      const milestone = { _id: 'eh484h4j3ihh98hr93', name: 'New milestone', epics: [] }
      service.selectedMilestone.next(milestone)
      const newEpic = { name: 'A new epic' }
      const expectedPayload = JSON.stringify(newEpic)
      const expectedURL = `/milestone/${milestone._id}/epic`
      stubPost(http, expectedURL, expectedPayload, newEpic)

      await service.createEpic(newEpic)
      const updatedMilestone = service.selectedMilestone.getValue()

      updatedMilestone.epics.should.have.lengthOf(1)
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })
})