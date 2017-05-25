import chai from "chai"
import sinon from "sinon"
import chaiAsPromised from "chai-as-promised"

import { setupMocha } from "../setup"
import { post, get } from "../support/httpHelpers"

import Project from '../../../src/backend/models/Project'
import Milestone from '../../../src/backend/models/Milestone'
import Epic from '../../../src/backend/models/Epic'

const expect = chai.expect
chai.use(chaiAsPromised)

describe("Project related endpoints", () => {
  setupMocha()
  const newProjectName = 'Project for test'

  describe("POST /project", () => {
    it("Creates a new project", async() => {
      const response = await post("/project", { "name": newProjectName }, 200)

      const body = response.body

      expect(body.name).to.eq(newProjectName)
      expect(body.createdAt).to.be.present
    })

    it("A new project has no milestones", async() => {
      const response = await post("/project", { "name": newProjectName }, 200)

      const body = response.body

      expect(body.milestones).to.be.empty
    })
  })

  describe("GET /projects", () => {
    const newMilestoneName = 'Milestone 1'
    const newEpicName = 'New epic'

    const expectToBeEqual = (response, projects) => expect(response.body).to.be.deep.equal(projects)
    const asPlainJSON = (creationPromise) => creationPromise.then(JSON.stringify).then(JSON.parse)

    it("Returns an empty list when there are no projects", async() => {
      const response = await get("/projects", 200)

      expect(response.body).to.be.empty
    })

    it("Return a list of projects", async() => {
      const project = await asPlainJSON(Project.create({ name: newProjectName }))

      const response = await get("/projects", 200)

      expectToBeEqual(response, [project])
    })

    it("When a project has an associated milestone, it is populated within the project", async() => {
      const milestone = await Milestone.create({ name: newMilestoneName })
      const project = await asPlainJSON(Project.create({ name: newProjectName, milestones: [milestone] }))

      const response = await get("/projects", 200)

      expectToBeEqual(response, [project])
    })

    it("When a the milestone has an epic, it is populated within the project", async() => {
      const epic = await Epic.create({ name: newEpicName })
      const milestone = await Milestone.create({ name: newMilestoneName, epics: [epic] })
      const project = await asPlainJSON(Project.create({ name: newProjectName, milestones: [milestone] }))

      const response = await get("/projects", 200)

      expectToBeEqual(response, [project])
    })
  })

  describe("POST /project/:project/milestone", async() => {
    it("The milestone has a project associated to it", async() => {
      const project = await Project.create({ name: 'A project', milestones: [] })
      const milestoneName = 'A milestone'

      const response = await post(`/project/${project._id}/milestone`, { name: milestoneName }, 200)
      const milestone = response.body

      expect(milestone.project).to.be.present
    })
  })
});