const Score = require("../models/scores.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");
const Course = require("../models/course.model");
const SubmittedProject = require("../models/submittedProject.model");

/**

Submits a project.
@param {Object} req - The request object.
@param {Object} req.body - The request body containing course_name, project_name, and project_link.
@returns {Object} The response object with a success message and status code.
@throws {Error} If the course or project is not found, the project has already been submitted, or
                there is an error creating the submitted project.
*/

exports.submitProject = async (req, res) => {
  const { course_name, project_name, project_link } = req.body;
  const { id } = req.user.user;

  const course = await Course.findOne({ where: { course_name } });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  const project = await Project.findOne({ where: { project_name } });
  if (!project) {
    const err = Error(`Project with name ${project_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

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

/**

Retrieves submitted projects based on the course name.
@param {Object} req - The request object.
@param {Object} req.body - The request body containing course_name.
@returns {Object} The response object with a success message, status code, and submitted projects.
*/

exports.getSubmittedProjects = async (req, res) => {
  const { course_name } = req.body;

  const submittedProjects = await SubmittedProject.findAll({
    where: { course_name, status: "pending" },
  });

  return res.status(200).json({
    success: true,
    submittedProjects,
  });
};

/**

Scores a submitted project.
@param {Object} req - The request object.
@param {Object} req.body - The request body containing project_name, student_id, and score.
@returns {Object} The response object with a success message, status code, and the score.
@throws {Error} If the project is not found or there is an error creating the score.
*/

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

  await SubmittedProject.update(
    { status: "scored" },
    { where: { project_name, student_id } }
  );

  return res.status(200).json({
    success: true,
    message: `You have scored the project successfully`,
    score: `The score is ${score}`,
  });
};

/**

Retrieves the score of a student based on the student ID and course name.
@param {Object} req - The request object.
@param {Object} req.body - The request body containing student_id and course_name.
@returns {Object} The response object with a success message, status code, and the score.
*/

exports.getScore = async (req, res) => {
  const { student_id, course_name } = req.body;

  const score = await Score.findOne({
    where: { student_id, course_name },
  });

  return res.status(200).json({
    success: true,
    score,
  });
};
