import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
const expect = chai.expect;

describe("Projects", () => {

  afterEach(() => {
    mongoose.connect("mongodb://localhost/scram", () => mongoose.connection.db.dropDatabase())
  });

  it("creates a new project", async() => {
    browser.get("http://localhost:3001");

    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();

    const projectName = await element(by.id("selected-project-name")).getText();
    expect(projectName).to.be.equal('Proyecto: Proyecto')
  });

  it("changes actual project", async() => {
    browser.get("http://localhost:3001");

    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();
    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto 2");
    await element(by.id("submit-modal")).click();

    const options = await $('#project-list').all(by.tagName('option'));
    options[1].click();

    const projectName = await element(by.id("selected-project-name")).getText();
    expect(projectName).to.be.equal('Proyecto: Proyecto')
    //Ver binding
  });
});