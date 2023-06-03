const Course = require("../models/courses.Model");
const Content = require("../models/courseContent.Model");
const User = require("../models/users.Model");
const Project = require("../models/projects.Model");

exports.createCourse = async (req, res) => {
  const { email, id } = req.user;

  const author = await User.findOne({ email });
  if (author && author.type !== "author") {
    const err = Error(` Your account is not authorized to create a course`);
    err.status = 401;
    err.type = "custom";
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

exports.addResource = async (req, res) => {
  const { course_name, content_url, content_name, content_order, week_order } =
    req.body;
  const course = Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to add resource to this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  const newContent = Content.create({
    course_name,
    content_name,
    content_order,
    content_url,
    week_order,
  });
  return res.status(201).json({
    success: true,
    message: `Content created successfully!`,
    newContent,
  });
};

exports.updateCourse = async (req, res) => {
  const { course_name } = req.body;
  const course = Course.findOne({ course_name });
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

  const updatedCourse = await Course.update(req.body, {
    where: { course_name },
  });
};
// controller to delete a course
exports.deleteCourse = async (req, res) => {
  const { course_name } = req.body;
  const course = Course.findOne({ course_name });
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

exports.addProject = async (req, res) => {
  const { course_name, project_name, description, week_number, due_date } =
    req.body;

  const course = Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to add project to this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  const newProject = await Project.create({
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

// controller to update project
exports.updateProject = async (req, res) => {
  const { course_name, project_name, updateData } = req.body;

  const course = Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  if (course.author_id !== req.user.id) {
    const err = Error(
      `You are not authorized to update project to this course ${course_name}`
    );
    err.status = 401;
    err.type = "custom";
    throw err;
  }

  const updatedProject = await Project.update(updateData, {
    where: { project_name },
  });
  return res.status(201).json({
    success: true,
    message: `Project updated successfully!`,
  });
};

exports.getCourse = async (req, res) => {
  const { course_name } = req.body;
  const course = Course.findOne({ course_name });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  const projects = await Project.findAll({ where: { course_name } });
  const contents = await Content.findAll({ where: { course_name } });
  const score = await Score.findOne({ where: { course_name } });

  return res.status(200).json({
    success: true,
    message: `Course fetched successfully!`,
    course,
    projects,
    contents,
    score,
  });
};
