import "babel-polyfill"
import chai from "chai"
import factory from "factory-girl"
import {cleanDB} from "./support/cleanDB";
const expect = chai.expect;
require('./../factories/all_factories');

describe("Projects", () => {
  cleanDB();

  it("creates a new project", async() => {
    browser.get(`http://${process.env.APP_SERVER}:3001`);

    element(by.id("new-project")).click();
    element(by.css("input[ng-reflect-name=name]")).sendKeys("Proyecto");
    element(by.id("submit-modal")).click();

    const projectName = await element(by.id("selected-project-name")).getText();
    expect(projectName).to.be.equal('Proyecto: Proyecto')
  });

  it("changes actual project", async() => {
    await factory.create('Project', {name: 'Proyecto'});
    await factory.create('Project', {name: 'Proyecto 2'});
    await browser.get(`http://${process.env.APP_SERVER}:3001`);

    const options = await $('#project-list').all(by.tagName('option'));
    options[1].click();

    const projectName = await element(by.id("selected-project-name")).getText();
    expect(projectName).to.be.equal('Proyecto: Proyecto')
    //Ver binding
  });
});