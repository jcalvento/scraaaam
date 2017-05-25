import factory from 'factory-girl';
import Task from "../../src/backend/models/Task";

factory.define('Task', Task, {
  description: factory.seq('Task.name', (n) => `Task ${n}`),
  epic: factory.assoc('Epic', '_id'),
});