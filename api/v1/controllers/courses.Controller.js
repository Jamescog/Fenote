const Course = require("../models/courses.Model");
const Content = require("../models/courseContent.Model");
const User = require("../models/users.Model");
const Project = require("../models/projects.Model");

/**
 * Creates a new course.
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.email - The email of the authenticated user.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {Object} req.body - The request body containing course_name, description, prerequisites, skill_level, and author_id.
 * @returns {Object} The response object with a success message, created course, and status code.
 * @throws {Error} If the user is not authorized or there is an error creating the course.
 */
exports.createCourse = async (req, res) => {
  const { email } = req.user;

  const author = await User.findOne({ email });
  if (author && author.type !== "author") {
    const err = Error(`Your account is not authorized to create a course`);
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  req.body.author_id = author.id;
  const { course_name, description, prerequisites, skill_level, author_id } =
    req.body;
  const newCourse = await Course.create({
    course_name,
    description,
    prerequisites,
    skill_level,
    author_id,
  });

  return res.status(201).json({
    success: true,
    message: `Course created successfully!`,
    newCourse,
  });
};

/**
 * Adds a resource to a course.
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.user.id - The ID of the authenticated user.
 * @param {Object} req.body - The request body containing course_name, content_url, content_name, content_order, and week_number.
 * @returns {Object} The response object with a success message, created content, and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error creating the content.
 */
exports.addResource = async (req, res) => {
  const { course_name, content_url, content_name, content_order, week_number } =
    req.body;
  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.user.id) {
    const err = Error(
      `You are not authorized to add a resource to this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  const course_id = course.course_id;
  const newContent = await Content.create({
    course_id,
    course_name,
    content_name,
    content_order,
    content_url,
    week_number,
  });
  return res.status(201).json({
    success: true,
    message: `Content created successfully!`,
    newContent,
  });
};

/**
 * Updates a course.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing course_name and updateData.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error updating the course.
 */
exports.updateCourse = async (req, res) => {
  const { course_name } = req.body;
  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to update this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  await Course.update(req.body, {
    where: { course_name },
  });
};

/**
 * Deletes a course.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing course_name.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error deleting the course.
 */
exports.deleteCourse = async (req, res) => {
  const { course_name } = req.body;
  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to delete this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  await Course.destroy({ where: { course_name } });
  return res.status(200).json({
    success: true,
    message: `Course deleted successfully!`,
  });
};

/**
 * Adds a project to a course.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing course_name, project_name, description, week_number, and due_date.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error creating the project.
 */
exports.addProject = async (req, res) => {
  const { course_name, project_name, description, week_number, due_date } =
    req.body;

  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to add a project to this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  await Project.create({
    course_name,
    project_name,
    description,
    week_number,
    due_date,
  });
  return res.status(201).json({
    success: true,
    message: `Project created successfully!`,
  });
};

/**
 * Updates a project.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing course_name, project_name, and updateData.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error updating the project.
 */
exports.updateProject = async (req, res) => {
  const { course_name, project_name } = req.body;

  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to update the project ${project_name} in this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  await Project.update(req.body.updateData, {
    where: { course_name, project_name },
  });
};

/**
 * Deletes a project.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing course_name and project_name.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the course is not found, the user is not authorized, or there is an error deleting the project.
 */
exports.deleteProject = async (req, res) => {
  const { course_name, project_name } = req.body;

  const course = await Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to delete the project ${project_name} in this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  await Project.destroy({ where: { course_name, project_name } });
  return res.status(200).json({
    success: true,
    message: `Project deleted successfully!`,
  });
};
