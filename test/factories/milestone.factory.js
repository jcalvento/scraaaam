import factory from 'factory-girl';
import Milestone from "../../src/backend/models/Milestone";

factory.define('Milestone', Milestone, {
  name: factory.seq('Milestone.name', (n) => `Milestone ${n}`),
  project: factory.assoc('Project', '_id'),
});