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
  const { id } = req.user.user;

  const author = await User.findOne({ id });
  if (author && author.type !== "author") {
    const err = Error(`Your account is not authorized to create a course`);
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  req.body.author_id = id;
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

  if (course.author_id !== req.user.user.id) {
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

  if (course.author_id !== req.user.user.id) {
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

/**
 * Retrieves a course by its name.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the course_name.
 * @returns {Object} The response object with the retrieved course and status code.
 * @throws {Error} If the course is not found or there is an error retrieving the course.
 */

exports.getCourseByName = async (req, res) => {
  const { course_name } = req.params.course_name;

  const course = await Course.findOne({ course_name });

  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  const author = await User.findOne({ id: course.author_id });
  const projects = await Project.findAll({ course_name });
  const courseProjects = projects.map((project) => {
    return {
      project_name: project.project_name,
      description: project.description,
      week_number: project.week_number,
      due_date: project.due_date,
    };
  });

  const contents = await CourseContent.findAll({ course_name });
  const courseContent = courseContent.map((content) => {
    return {
      content_name: content.content_name,
      description: content.description,
      week_number: content.week_number,
      contenet_order: content.content_order,
      content_type: content.content_type,
    };
  });

  return res.status(200).json({
    success: true,
    message: `Course found successfully!`,
    course: {
      course_name: course.course_name,
      description: course.description,
      duration: course.duration,
      author: author.full_name,
      course_id: course.course_id,
      skill_level: course.skill_level,
      courseProjects,
      courseContent,
    },
  });
};

/**
 * Retrieves all approved courses.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.skill_level - Optional. The skill level to filter the courses by.
 * @returns {Object} The response object with the retrieved courses and status code.
 */

exports.getAllApprovedCourses = async (req, res) => {
  const skill_level = req.query.skill_level;
  const courses = await Course.findAll({
    where: { status: "approved" },
  });

  if (skill_level) {
    const filteredCourses = courses.filter(
      (course) => course.skill_level === skill_level
    );
    return res.status(200).json({
      success: true,
      message: `Courses found successfully!`,
      courses: filteredCourses,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: `Courses found successfully!`,
      courses,
    });
  }
};

/**
 * Retrieves all pending courses.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success message and the list of pending courses.
 */

exports.getAllPendingCourses = async (req, res) => {
  const courses = await Course.findAll({
    where: { status: "pending" },
  });

  return res.status(200).json({
    success: true,
    message: `Courses found successfully!`,
    courses,
  });
};

/**
 * Approves or rejects a course.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing the course_name and result (approved or rejected).
 * @returns {Object} The response object with the status message and status code.
 */

exports.approveCourse = async (req, res) => {
  const { course_name, result } = req.body;

  const course = await Course.findOne({ course_name });

  if (result === "approved") {
    await Course.update({ status: "approved" }, { where: { course_name } });
    return res.status(200).json({
      success: true,
      message: `Course approved successfully!`,
    });
  }

  if (result === "rejected") {
    await Course.destroy({ where: { course_name } });
    return res.status(200).json({
      success: true,
      message: `Course rejected successfully!`,
    });
  }
};

/**
 * Retrieves all courses created by the authenticated author.
 * @param {Object} req - The request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.user.id - The ID of the authenticated author.
 * @returns {Object} The response object with the retrieved courses and status code.
 */

exports.getAllCoursesByAuthor = async (req, res) => {
  const author_id = req.user.user.id;

  const courses = await Course.findAll({
    where: { author_id },
  });

  return res.status(200).json({
    success: true,
    message: `Courses found successfully!`,
    courses,
  });
};

/**
 * Retrieves all courses by skill_level.
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.skill_level - The skill level to filter the courses by.
 * @returns {Object} The response object with the retrieved courses and status code.
 * @throws {Error} If the skill_level is not provided.
 * @throws {Error} If the skill_level is not valid.
 * @throws {Error} If there is an error retrieving the courses.
 */

exports.getCoursesBySkillLevel = async (req, res, next) => {
  const { skill_level } = req.query;

  if (!skill_level) {
    const err = new Error(`Skill level is required`);
    err.status = 400;
    err.type = "custom";
    return next(err);
  }

  if (
    skill_level !== "beginner" &&
    skill_level !== "intermediate" &&
    skill_level !== "advanced"
  ) {
    const err = new Error(`Skill level is invalid`);
    err.status = 400;
    err.type = "custom";
    throw err;
  }

  const courses = await Course.findAll({
    where: {
      skill_level: skill_level,
    },
  });

  res.status(200).json({ courses });
};
