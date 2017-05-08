import "babel-polyfill"
import chai from "chai"
import factory from 'factory-girl';
import {cleanDB} from "./support/cleanDB";
require('./../factories/all_factories');

const expect = chai.expect;

describe("Milestones", () => {
  cleanDB();

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