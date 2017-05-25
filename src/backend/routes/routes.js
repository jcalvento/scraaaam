import express from 'express'
import {findRecord, createRecordAssociatedWith} from './routesHelper'

import Project from '../models/Project.js'
import Milestone from "../models/Milestone";
import Epic from "../models/Epic";
import Comment from "../models/Comment";
import Task from "../models/Task";

let router = express.Router();

// Define router params.
(() => {
  [
    { paramName: 'project', record: findRecord(Project) },
    { paramName: 'milestone', record: findRecord(Milestone) },
    { paramName: 'epic', record: findRecord(Epic) }
  ].map(param => { router.param(param.paramName, param.record) })
})();

// Define post creator routes.
(() => {
  [
    { routePath: '/project/:project/milestone', createAssociationBlock: createRecordAssociatedWith(Milestone, 'project') },
    { routePath: '/milestone/:milestone/epic', createAssociationBlock: createRecordAssociatedWith(Epic, 'milestone') },
    { routePath: '/epics/:epic/comment', createAssociationBlock: createRecordAssociatedWith(Comment, 'epic') },
    { routePath: '/epics/:epic/task', createAssociationBlock: createRecordAssociatedWith(Task, 'epic') }
  ].map(postParam => { router.post(postParam.routePath, postParam.createAssociationBlock) })
})();

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

router.get('/epics/:epic', (req, res, next) => {
  req.epic.populate('comments tasks').execPopulate().then(epic => res.json(epic)).catch(next);
});

router.delete('/tasks/:task', (req, res, next) => {
  let taskId = req.params.task;
  Task.remove({_id: taskId}).then(_ => res.json({_id: taskId})).catch(next);
});

export default router