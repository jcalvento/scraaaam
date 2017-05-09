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
  let projectSub
  let selectedProjectSub
  let selectedMilestoneSub

  beforeEach(async() => {
    http = sinon.createStubInstance(Http)
    projectSub = new BehaviorSubject([])
    selectedProjectSub = new BehaviorSubject({})
    selectedMilestoneSub = new BehaviorSubject({})

    http.get.withArgs("/projects").callsFake(() => createResponse(projects));
    service = await new ProjectService(http, projectSub, selectedProjectSub, selectedMilestoneSub)
  })

  it("Loads initial data from the server", () => {
    const currentProjects = projectSub.getValue()
    currentProjects.should.be.deep.equals(projects)
    selectedProjectSub.getValue().should.equals(projects[0])
  })

  describe("#createProject", () => {
    it("invokes the backend to create the project", async() =>{
      const newProject = { name: 'New project' }
      const expectedPayload = JSON.stringify(newProject)
      const expectedURL = `/project`
      projectSub.next(projects)
      stubPost(http, expectedURL, expectedPayload, newProject)

      service.createProject(newProject)

      projectSub.getValue().should.be.deep.equals(projects)
      selectedProjectSub.getValue().should.equals(projects[0])
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })

  describe("#createMilestone", () => {
    it("invokes the backend to create the project", async() =>{
      const project = projects[0]
      selectedProjectSub.next(project)
      const newMilestone = { name: 'Nueva milestone' }
      const expectedPayload = JSON.stringify(newMilestone)
      const expectedURL = `/project/${project._id}/milestone`
      stubPost(http, expectedURL, expectedPayload, newMilestone)

      await service.createMilestone(newMilestone)
      const updatedProject = selectedProjectSub.getValue()

      updatedProject.milestones.should.have.lengthOf(1)
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })

  describe("#createEpic", () => {
    it("invokes the backend to create the project", async() =>{
      const milestone = { _id: 'eh484h4j3ihh98hr93', name: 'New milestone', epics: [] }
      selectedMilestoneSub.next(milestone)
      const newEpic = { name: 'A new epic' }
      const expectedPayload = JSON.stringify(newEpic)
      const expectedURL = `/milestone/${milestone._id}/epic`
      stubPost(http, expectedURL, expectedPayload, newEpic)

      await service.createEpic(newEpic)
      const updatedMilestone = selectedMilestoneSub.getValue()

      updatedMilestone.epics.should.have.lengthOf(1)
      http.post.should.have.been.calledWith(expectedURL, expectedPayload)
    })
  })

})