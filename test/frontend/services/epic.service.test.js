import chai from "chai"
import sinon from "sinon"
import sinonChai from "sinon-chai"

import { Http } from '@angular/http';

const should = chai.should()
chai.use(sinonChai)

import EpicService from "../../../src/frontend/app/services/epic.service"

describe("Epic service", ()=> {
  const http = sinon.createStubInstance(Http)
  const service = new EpicService(http)
  const fakeEpic = { _id: '38ft487gf84gf4' }
  
  it("#getEpic retrieves the epic from the backend", async() => {
    http.get.withArgs(`/epics/${fakeEpic._id}`).callsFake(() => {
      return createResponse({ _id: fakeEpic._id })
    })
    
    service.getEpic(fakeEpic._id)

    http.get.should.have.been.calledWith(`/epics/${fakeEpic._id}`)
  })

  it("#createComment creates a new comment and returns it as json", async() => {
    const comment = { body: 'A body' }
    const expectedURL = `/epics/${fakeEpic._id}/comment`
    const expectedPayload =  JSON.stringify(comment)
    stubPost(expectedURL, expectedPayload, comment)
  
    service.createComment(fakeEpic, comment)

    http.post.should.have.been.calledWith(expectedURL, expectedPayload)
  })

  it("#createTask creates a new comment and returns it as json", async() => {
    const task = { description: 'A description' }
    const expectedURL = `/epics/${fakeEpic._id}/task`
    const expectedPayload = JSON.stringify(task)
    stubPost(expectedURL, expectedPayload, task)
    
    service.createTask(fakeEpic, task)

    http.post.should.have.been.calledWith(expectedURL, expectedPayload)
  })

  const stubPost = (url, payload, returnValue) => {
    http.post.withArgs(url, payload).callsFake(() => {
        return createResponse(returnValue)
    })
  }

  const createResponse = (data) => {
    return {
      toPromise() {
        return Promise.resolve({
          json() {
            return data;
          }
        })
      }
    }
  }
})