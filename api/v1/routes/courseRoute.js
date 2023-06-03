const express = require("express");
const router = express.Router();
const {
  createCourse,
  addResource,
  addProject,
} = require("../controllers/course.Controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, createCourse);
router.post("/addResource", verifyToken, addResource);
router.post("/addProject", verifyToken, addProject);

module.exports = router;
