import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
const expect = chai.expect;

describe("Epics", () => {

  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });

  it("creates a new epic", async() => {
    browser.get("http://localhost:3001");
    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();
    element(by.id("new-milestone")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Milestone");
    element(by.id("submit-modal")).click();
    $('.milestone').click();

    element(by.id("new-epica")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Epica");
    await element(by.id("submit-modal")).click();

    const epicName = await $('.epic').getText();
    expect(epicName).to.be.equal('Epica');
  });
});
