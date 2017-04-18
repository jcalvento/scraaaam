import express from 'express'

import Project from '../models/Project.js'
import Milestone from "../models/Milestone";
import Epic from "../models/Epic";
import Comment from "../models/Comment";
import Task from "../models/Task";

let router = express.Router();

router.param('project', (req, res, next, value) => {
  _findRecord(req, res, next, value, Project)
});

router.param('milestone', (req, res, next, value) => {
  _findRecord(req, res, next, value, Milestone)
});

router.param('epic', (req, res, next, value) => {
  _findRecord(req, res, next, value, Epic)
});

// Express routes
router.get('/projects', (req, res, next) => {
  Project.find().populate({ path:'milestones', model: 'Milestone', populate: { path: 'epics', model: 'Epic'}})
    .then(projects => res.json(projects))
    .catch(next)
});

router.post('/project', (req, res, next) => {
  const project = new Project(req.body);

  project.save()
    .then(project => res.json(project))
    .catch(next)
});

router.post('/project/:project/milestone', (req, res, next) => {
  _createRecordAssociatedWith(req, res, next, Milestone, 'project')
});

router.post('/milestone/:milestone/epic', (req, res, next) => {
  _createRecordAssociatedWith(req, res, next, Epic, 'milestone')
});

router.get('/epics/:epic', (req, res, next) => {
  req.epic.populate('comments tasks').execPopulate().then(epic => res.json(epic)).catch(next);
});

router.post('/epics/:epic/comment', (req, res, next) => {
  _createRecordAssociatedWith(req, res, next, Comment, 'epic')
});

router.post('/epics/:epic/task', (req, res, next) => {
  _createRecordAssociatedWith(req, res, next, Task, 'epic')
});

// Private Methods

function _findRecord(req, res, next, value, record) {
  const modelName = record.modelName;
  console.log(modelName);
  record.findById(value)
    .then(recordInstance => {
      if (!recordInstance) {
        throw new Error(`${modelName} not found ${value}`)
      }
      req[modelName.toLowerCase()] = recordInstance;
      console.log(recordInstance);
      next()
    })
    .catch(next)
}

function _createRecordAssociatedWith(req, res, next, recordTable, associationName) {
  const newRecord = new recordTable(req.body);
  let association = req[associationName];
  newRecord[associationName] = association;

  newRecord.save()
    .then(savedRecord => {
      const manyRelation = `${recordTable.modelName.toLowerCase()}s`;
      association[manyRelation].push(savedRecord);

      association.save()
        .then(_ => res.json(savedRecord))
        .catch(next);

      res.json(newRecord)
    })
    .catch(next)
}
export default router