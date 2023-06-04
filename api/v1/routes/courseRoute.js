const express = require("express");
const router = express.Router();
const {
  createCourse,
  addResource,
  addProject,
} = require("../controllers/courses.Controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/create", verifyToken, createCourse);
router.post("/addResource", verifyToken, addResource);
router.post("/addProject", verifyToken, addProject);

module.exports = router;
