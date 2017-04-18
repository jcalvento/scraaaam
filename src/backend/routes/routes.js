import express from 'express'
import {findRecord, createRecordAssociatedWith} from './routesHelper'

import Project from '../models/Project.js'
import Milestone from "../models/Milestone";
import Epic from "../models/Epic";
import Comment from "../models/Comment";
import Task from "../models/Task";

let router = express.Router();

router.param('project', (req, res, next, value) => {
  findRecord(req, res, next, value, Project)
});

router.param('milestone', (req, res, next, value) => {
  findRecord(req, res, next, value, Milestone)
});

router.param('epic', (req, res, next, value) => {
  findRecord(req, res, next, value, Epic)
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
  createRecordAssociatedWith(req, res, next, Milestone, 'project')
});

router.post('/milestone/:milestone/epic', (req, res, next) => {
  createRecordAssociatedWith(req, res, next, Epic, 'milestone')
});

router.get('/epics/:epic', (req, res, next) => {
  req.epic.populate('comments tasks').execPopulate().then(epic => res.json(epic)).catch(next);
});

router.post('/epics/:epic/comment', (req, res, next) => {
  createRecordAssociatedWith(req, res, next, Comment, 'epic')
});

router.post('/epics/:epic/task', (req, res, next) => {
  createRecordAssociatedWith(req, res, next, Task, 'epic')
});

export default router