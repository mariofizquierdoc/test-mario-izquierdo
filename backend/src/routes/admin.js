const { Router } = require('express');
const { listAllUsers, showProfile, saveProfile, listStats } = require('../controllers/profileController');
const { listAllProjects, listUserProjects, createProject, showProject, showProjectRelatedUsers, updateProject, deleteProject } = require('../controllers/projectController');
const { listProjectTasks, listUserTasks, createTask, showTask, showMyTask, updateTask, updateMyTask, deleteTask } = require('../controllers/taskController');
const authenticateToken = require('../middlewares/auth');

const router = Router();

router.get('/users', authenticateToken, listAllUsers);

router.get('/profile', authenticateToken, showProfile);
router.post('/profile', authenticateToken, saveProfile);

router.get('/projects', authenticateToken, listAllProjects);
router.get('/my-projects', authenticateToken, listUserProjects);
router.post('/my-projects', authenticateToken, createProject);
router.get('/projects/:id', authenticateToken, showProject);
router.get('/projects/:id/users', authenticateToken, showProjectRelatedUsers);
router.put('/projects/:id', authenticateToken, updateProject);
router.delete('/projects/:id', authenticateToken, deleteProject);

router.get('/my-stats', authenticateToken, listStats);

router.get('/projects/:projectId/tasks', authenticateToken, listProjectTasks);
router.post('/projects/:projectId/tasks', authenticateToken, createTask);
router.get('/my-tasks', authenticateToken, listUserTasks);
router.get('/my-tasks/:id', authenticateToken, showMyTask);
router.put('/my-tasks/:id', authenticateToken, updateMyTask);
router.get('/projects/:projectId/tasks/:id', authenticateToken, showTask);
router.put('/projects/:projectId/tasks/:id', authenticateToken, updateTask);
router.delete('/projects/:projectId/tasks/:id', authenticateToken, deleteTask);

module.exports = router;