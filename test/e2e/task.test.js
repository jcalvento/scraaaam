import "babel-polyfill"
import chai from "chai"
import Epic from "../../src/backend/models/Epic";
import factory from 'factory-girl';
import {cleanDB} from "./support/cleanDB";
require('./../factories/all_factories');

const expect = chai.expect;

describe("Tasks", () => {
  cleanDB();

  it("creates a new task", async() => {
    const epic = await factory.create('Epic');
    browser.get(`${process.env.APP_SERVER}/#/epics/${epic._id}`);

    element(by.id("new-tarea")).click();
    element(by.css("input[ng-reflect-name=description]")).sendKeys("Task");
    await element(by.id("submit-modal")).click();

    const task = await $('.task').getText();
    expect(task).to.contain('Task');
  });

  it("removes a task", async() => {
    const epic = await factory.create('Epic');
    browser.get(`${process.env.APP_SERVER}/#/epics/${epic._id}`);
    element(by.id("new-tarea")).click();
    element(by.css("input[ng-reflect-name=description]")).sendKeys("Task");
    await element(by.id("submit-modal")).click();

    await $(".delete-task").click();

    const tasksCount = await element.all(by.css('task')).count();
    expect(tasksCount).to.be.equal(0);
  });
});

