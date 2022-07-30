const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/CourseController');


router.get('/courses',coursesController.view);



module.exports = router ;