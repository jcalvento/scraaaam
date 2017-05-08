import factory from 'factory-girl';
import Epic from "../../src/backend/models/Epic";

factory.define('Epic', Epic, {
  name: factory.seq('Epic.name', (n) => `Epic ${n}`),
  milestone: factory.assoc('Milestone', '_id'),
});