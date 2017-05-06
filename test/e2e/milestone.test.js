import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
const expect = chai.expect;

describe("Milestones", () => {

  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });

  it("creates a new milestone", async() => {
    browser.get("http://localhost:3001");
    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();

    element(by.id("new-milestone")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Milestone");
    await element(by.id("submit-modal")).click();

    const milestone = await $('.milestone').getText();
    expect(milestone.includes('Milestone')).to.be.true;
  });
});