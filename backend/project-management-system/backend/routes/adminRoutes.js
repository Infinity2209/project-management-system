const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Customer = require('../models/Customer');

// @route   POST api/admin/projects
// @desc    Create a new project
// @access  Private
router.post('/projects', async (req, res) => {
  try {
    const { customerId, name, description } = req.body;
    
    // Verify customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    const newProject = new Project({
      customer: customerId,
      name,
      description
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/projects/:id/status
// @desc    Update project status
// @access  Private
router.put('/projects/:id/status', async (req, res) => {
  try {
    const { progress, description } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Update progress
    project.progress = progress;
    
    // Add status update
    project.statusUpdates.push({ description });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/projects/:id/upload
// @desc    Upload files to project
// @access  Private
router.post('/projects/:id/upload', async (req, res) => {
  try {
    const { fileType, path, originalName } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Add file to appropriate array based on type
    if (fileType === 'document') {
      project.documents.push({ path, originalName });
    } else if (fileType === 'image') {
      project.images.push({ path, originalName });
    } else if (fileType === 'video') {
      project.videos.push({ path, originalName });
    } else {
      return res.status(400).json({ msg: 'Invalid file type' });
    }

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/projects
// @desc    Get all projects
// @access  Private
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ dateCreated: -1 })
      .populate('customer', 'name email');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
