const Score = require("../models/scores.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Course = require("../models/course.model");
const SubmittedProject = require("../models/submittedProject.model");

exports.submitProject = async (req, res) => {
  const { course_name, project_name, project_link } = req.body;
  const { id } = req.user.user;

  //check if tehe course exists
  const course = await Course.findOne({ where: { course_name } });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  //check if the project exists
  const project = await Project.findOne({ where: { project_name } });
  if (!project) {
    const err = Error(`Project with name ${project_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  // check if the project is submitted
  const submittedProject = await SubmittedProject.findOne({
    where: { project_name, student_id: id },
  });
  if (submittedProject) {
    const err = Error(`You have already submitted this project`);
    err.status = 400;
    err.type = "custom";
    throw err;
  }

  const submittedAt = new Date();
  // check if the project is submitted after the deadline
  let afterDeadline = false;
  if (submittedAt > project.deadline) {
    afterDeadline = true;
  }

  await SubmittedProject.create({
    project_name,
    project_link,
    student_id: id,
    afterDeadline,
  });

  return res.status(200).json({
    success: true,
    message: `You have submitted the project successfully`,
  });
};

// get submitted projects based on coursename
exports.getSubmittedProjects = async (req, res) => {
  const { course_name } = req.body;

  const submittedProjects = await SubmittedProject.findAll({
    where: { course_name },
  });

  return res.status(200).json({
    success: true,
    submittedProjects,
  });
};

// score submitted project

exports.scoreSubmittedProject = async (req, res) => {
  const { project_name, student_id, score } = req.body;

  // check if the project exists
  const project = await Project.findOne({ where: { project_name } });
  if (!project) {
    const err = Error(`Project with name ${project_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  // check if the project is submitted after the deadline
  const submittedProject = await SubmittedProject.findOne({
    where: { project_name, student_id },
  });

  if (submittedProject.afterDeadline) {
    score = score * 0.65;
  }

  await Score.create({
    project_name,
    student_id,
    score,
  });

  return res.status(200).json({
    success: true,
    message: `You have scored the project successfully`,
    score: `The score is ${score}`,
  });
};

// get score of student based on  student id
exports.getScore = async (req, res) => {
  const { student_id } = req.body;

  const score = await Score.findOne({
    where: { student_id },
  });

  return res.status(200).json({
    success: true,
    score,
  });
};
