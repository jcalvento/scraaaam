import chai from "chai"
import chaiAsPromised from "chai-as-promised"

import { setupMocha } from "../setup"
import { post } from "../support/httpHelpers"

import Milestone from '../../../src/backend/models/Milestone'
import Epic from '../../../src/backend/models/Epic'

const expect = chai.expect
chai.use(chaiAsPromised)

describe("Milestone related endpoints", () => {
  setupMocha()

  describe("POST /milestone/:milestone/epic", async() => {
    it("The epic has a milestone associated to it", async() => {
      const milestone = await Milestone.create({ name: 'A project', epics: [] })
      const epicName = 'new Epic'

      const response = await post(`/milestone/${milestone._id}/epic`, { name: epicName }, 200)
      const epic = response.body

      expect(epic.milestone).to.be.present
    })
  })
})