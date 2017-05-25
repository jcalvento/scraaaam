import factory from 'factory-girl';
import Project from "../../src/backend/models/Project";

factory.define('Project', Project, {
  name: factory.seq('Project.name', (n) => `Project ${n}`)
});
