import "babel-polyfill"
import chai from "chai"
import {cleanDB} from './support/cleanDB'
const expect = chai.expect;

describe("Epics", () => {
  cleanDB();

  beforeEach(() => {
    browser.get("http://localhost:3001");
  });

  it("creates a new epic", async() => {
    createMilestone();

    element(by.id("new-epica")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Epica");
    await element(by.id("submit-modal")).click();

    const epicName = await $('.epic').getText();
    expect(epicName).to.be.equal('Epica');
  });

  it("adds a new comment to a epic", async() => {
    createEpic();

    const comment = "Un comentario";
    element(by.id("new-comentario")).click();
    element(by.css("input[ng-reflect-name=body]")).sendKeys(comment);
    element(by.id("submit-modal")).click();

    const commentBody = await $('.comment').getText();
    expect(commentBody).to.contain(comment);
  });

  const createMilestone = () => {
    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();
    element(by.id("new-milestone")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Milestone");
    element(by.id("submit-modal")).click();
    $('.milestone').click();
  };

  const createEpic = () => {
    createMilestone();
    element(by.id("new-epica")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Epica");
    element(by.id("submit-modal")).click();
    $('.epic').click();
  }
});
