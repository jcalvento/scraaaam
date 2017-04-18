import express from 'express'

import Project from '../models/Project.js'
import Milestone from "../models/Milestone";
import Epic from "../models/Epic";
import Comment from "../models/Comment";

let router = express.Router();

router.param('project', (req, res, next, value) => {
  Project.findById(value)
    .then(project => {
      if (!project) {
        throw new Error(`Project not found ${value}`)
      }
      req.project = project;
      next()
    })
    .catch(next)
});

router.param('milestone', (req, res, next, value) => {
  _findRecord(req, res, next, value, Milestone)
});

router.param('epic', (req, res, next, value) => {
  _findRecord(req, res, next, value, Epic)
});

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
  const milestone = new Milestone(req.body);
  let project = req.project;
  milestone.project = project;

  milestone.save()
    .then(newMilestone => {
      project.milestones.push(newMilestone);

      project.save()
        .then(updatedProject => res.json(newMilestone))
        .catch(next);

      res.json(milestone)
    })
    .catch(next)
});

router.post('/milestone/:milestone/epic', (req, res, next) => {
  const epic = new Epic(req.body);
  let milestone = req.milestone;
  epic.milestone = milestone;

  epic.save()
    .then(newEpic => {
      milestone.epics.push(newEpic);

      milestone.save()
        .then(_ => res.json(newEpic))
        .catch(next);
        
      res.json(epic)
    })
    .catch(next)
});

router.get('/epics/:epic', (req, res, next) => {
  req.epic.populate('comments').execPopulate().then(epic => res.json(epic)).catch(next);
});

router.post('/epics/:epic/comment', (req, res, next) => {
  const comment = new Comment(req.body);
  let epic = req.epic;
  comment.epic = epic;

  comment.save()
    .then(newComment => {
      epic.comments.push(newComment);

      epic.save()
        .then(_ => res.json(newComment))
        .catch(next);

      res.json(comment)
    })
    .catch(next)
})

export default router