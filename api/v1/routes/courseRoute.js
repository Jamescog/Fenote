/**
 * Express router for handling course-related routes.
 * @module routers/courseRouter
 */

const express = require("express");
const router = express.Router();
const {
  createCourse,
  addResource,
  addProject,
  updateCourse,
  deleteCourse,
  updateProject,
  deleteProject,
  getCourseByName,
  getAllApprovedCourses,
  getAllPendingCourses,
  getAllCoursesByAuthor,
  approveCourse,
} = require("../controllers/courses.Controller");
const { isAuthor, isAdmin, isStudent } = require("../middlewares/roleManager");
const { verifyToken } = require("../middlewares/verifyToken");

/**
 * Route for creating a new course.
 * @name POST /create
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/create", verifyToken, createCourse);

/**
 * Route for adding a resource to a course.
 * @name POST /addResource
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/addResource", verifyToken, isAuthor, addResource);

/**
 * Route for updating a course.
 * @name POST /updateCourse
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/updateCourse", verifyToken, isAuthor, updateCourse);

/**
 * Route for adding a project to a course.
 * @name POST /addProject
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/addProject", verifyToken, isAuthor, addProject);

/**
 * Route for deleting a course.
 * @name POST /deleteCourse
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/deleteCourse", verifyToken, isAuthor, deleteCourse);

/**
 * Route for updating a project.
 * @name POST /updateProject
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/updateProject", verifyToken, isAuthor, updateProject);

/**
 * Route for deleting a project.
 * @name POST /deleteProject
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/deleteProject", verifyToken, isAuthor, deleteProject);

/**
 * Route for getting a course by its name.
 * @name POST /getCourse:course_name
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/getCourse:course_name", verifyToken, getCourseByName);

/**
 * Route for getting all approved courses.
 * @name POST /getapprovedCourses
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/getapprovedCourses", verifyToken, getAllApprovedCourses);

/**
 * Route for getting all pending courses (only accessible by admin).
 * @name POST /getPendingCourses
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/getPendingCourses", verifyToken, isAdmin, getAllPendingCourses);

/**
 * Route for getting all courses by an author.
 * @name POST /getAllCoursesByAuthor
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/getAllCoursesByAuthor", verifyToken, getAllCoursesByAuthor);

/**
 * Route for approving or rejecting a course (only accessible by admin).
 * @name POST /approveCourse
 * @function
 * @memberof module:routers/courseRouter
 * @inner
 * @param {string} path - The route path.
 * @param {function[]} middlewares - The middlewares to be executed for this route.
 */
router.post("/approveCourse", verifyToken, isAdmin, approveCourse);

module.exports = router;
