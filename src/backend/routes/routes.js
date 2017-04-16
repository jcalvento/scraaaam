import express from 'express'

import Project from '../models/Project.js'
import Milestone from "../models/Milestone";

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

// Express routes
router.get('/projects', (req, res, next) => {
  Project.find().populate('milestones epics')
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

export default router