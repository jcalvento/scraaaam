import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
import factory from 'factory-girl';
require('./../factories/all_factories');

const expect = chai.expect;

describe("Milestones", () => {

  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });

  it("creates a new milestone", async() => {
    await factory.create('Project');
    browser.get("http://localhost:3001");

    element(by.id("new-milestone")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Milestone");
    await element(by.id("submit-modal")).click();

    const milestone = await $('.milestone').getText();
    expect(milestone.includes('Milestone')).to.be.true;
  });
});