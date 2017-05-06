import chai from "chai"
import chaiAsPromised from "chai-as-promised"

import { setupMocha } from "../setup"
import { post, get } from "../support/httpHelpers"

import Epic from '../../../src/backend/models/Epic'
import Comment from '../../../src/backend/models/Comment'
import Task from '../../../src/backend/models/Task'

const expect = chai.expect
chai.use(chaiAsPromised)

describe("Epic related endpoints", () => {
  setupMocha()

  describe("GET /epics/:epic", () => {
    it("Throws and error when the epic is missing", async() => {
      const unexistentRecordId = 156497

      await get(`/epics/${unexistentRecordId}`, 404)
    })

    const epicName = 'Test Epic'

    it("When the epic has a comment attached to it", async() => {
      const commentBody = 'New comment'
      const newComment = await Comment.create({ body: commentBody })
      const epic = await Epic.create({ name: epicName, comments: [newComment] })

      const response = await get(`/epics/${epic._id}`, 200)
      const comment = response.body.comments[0]

      expect(comment.body).to.eq(commentBody)
    })

    it("When the epic has a task attached to it", async() => {
      const taskDescription = 'Task desc'
      const newTask = await Task.create({ description: taskDescription })
      const epic = await Epic.create({ name: epicName, tasks: [newTask] })

      const response = await get(`/epics/${epic._id}`, 200)
      const task = response.body.tasks[0]

      expect(task.description).to.eq(taskDescription)
    })
  })

  describe("POST /epics/:epic/comment", async() => {
    const epic = await Epic.create({ name: 'An epic', comments: [] })

    it("The comment has an epic associated to it", async() => {
      const commentBody = 'New comment'

      const response = await post(`/epics/${epic._id}/comment`, { body: commentBody }, 200)
      const comment = response.body

      expect(comment.epic).to.be.present
    })

    it("The task has a epic associated to it", async() => {
      const description = 'A description'
    
      const response = await post(`/epics/${epic._id}/comment`, { description: description }, 200)
      const task = response.body
      
      expect(task.epic).to.be.present
    })
  })
});