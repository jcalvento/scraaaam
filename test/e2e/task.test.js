import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
import Epic from "../../src/backend/models/Epic";
import factory from 'factory-girl';
require('./../factories/all_factories');

const expect = chai.expect;

describe("Tasks", () => {

  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });

  it("creates a new task", async() => {
    const epic = await factory.create('Epic');
    browser.get(`http://localhost:3001/#/epics/${epic._id}`);

    element(by.id("new-tarea")).click();
    element(by.css("input[ng-reflect-name=description]")).sendKeys("Task");
    await element(by.id("submit-modal")).click();

    const task = await $('.task').getText();
    expect(task).to.contain('Task');
  });

  it("removes a task", async() => {
    const epic = await factory.create('Epic');
    browser.get(`http://localhost:3001/#/epics/${epic._id}`);
    element(by.id("new-tarea")).click();
    element(by.css("input[ng-reflect-name=description]")).sendKeys("Task");
    await element(by.id("submit-modal")).click();

    await $(".delete-task").click();

    const tasksCount = await element.all(by.css('task')).count();
    expect(tasksCount).to.be.equal(0);
  });
});

