import express from 'express'

import Project from '../models/Project.js'

let router = express.Router();

// Express routes
router.get('/projects', (req, res, next) => {
  Project.find()
    .then(project => res.json(projects))
    .catch(next)
});

router.post('/project', (req, res, next) => {
  const project = new Project(req.body);

  project.save()
    .then(project =>{
        res.json(project.id)
    })
    .catch(next)
});

export default router