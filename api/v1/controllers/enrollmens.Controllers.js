const User = require("../models/user.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

/**
 * Enrolls a student in a course.
 * @param {Object} req.body - The request body containing the course id.
 * @param {Object} req.user - The user object containing the user id.
 * @returns {Object} The response object with a success message and status code.
 * @throws {Error} If the user is already enrolled in the course.
 */

exports.enrollStudent = async (req, res) => {
  const { course_name } = req.body;
  const { id } = req.user.user;

  const course = await Course.findOne({ where: { course_name } });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  const enrollment = await Enrollment.findOne({
    where: { course_name, student_id: id },
  });
  if (enrollment) {
    const err = Error(`You are already enrolled in this course`);
    err.status = 400;
    err.type = "custom";
    throw err;
  }

  await Enrollment.create({ course_id, student_id: id });

  return res.status(200).json({
    success: true,
    message: `You have been enrolled in the course successfully`,
  });
};

exports.getStudents = async (req, res) => {
  const { course_name } = req.body;

  const course = await Course.findOne({ where: { course_name } });
  if (!course) {
    const err = Error(`Course with name ${course_name} is not found`);
    err.status = 404;
    err.type = "custom";
    throw err;
  }

  const enrollments = await Enrollment.findAll({
    where: { course_id: course.course_id },
  });

  const students = [];
  for (const enrollment of enrollments) {
    const student = await User.findOne({
      where: { id: enrollment.student_id },
    });
    students.push(student);
  }

  const total = students.length;
  return res.status(200).json({
    success: true,
    total,
    students,
  });
};
