import "babel-polyfill"
import mongoose from 'mongoose';
import chai from "chai"
import Epic from "../../src/backend/models/Epic";
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

  it("adds a new comment to a epic", async() => {
    // const epic = await Epic.create({name: 'Epic'});
    // browser.get(`http://localhost:3001/#/epics/${epic._id}`);
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
    element(by.id("submit-modal")).click();
    $('.epic').click();

    const comment = "Un comentario";
    element(by.id("new-comentario")).click();
    element(by.css("input[ng-reflect-name=body]")).sendKeys(comment);
    element(by.id("submit-modal")).click();

    const commentBody = await $('.comment').getText();
    expect(commentBody).to.contain(comment);
  });
});
