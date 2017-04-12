import express from 'express'

import Project from '../models/Project.js'

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
  Project.find()
    .then(projects => res.json(projects))
    .catch(next)
});

router.post('/project', (req, res, next) => {
  const project = new Project(req.body);

  project.save()
    .then(project => res.json(project))
    .catch(next)
});

router.put('/projects/:project/select', (req, res, next) => {
  Project.update({selected: true}, {selected: false}, {multi: true}).exec();

  const project = req.project;
  project.select();
  project.save()
    .then(updatedProject => res.json(updatedProject))
    .catch(next);
});

export default router