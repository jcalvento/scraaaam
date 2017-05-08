import request from "supertest"
import app from "../../../src/backend/app"

const post = (path, data, expectedResponse) => request(app).post(path).send(data).expect(expectedResponse)
const get = (path, expectedResponse) => request(app).get(path).expect(expectedResponse)

export { post, get }