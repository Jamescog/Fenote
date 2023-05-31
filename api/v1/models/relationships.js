const User = require("./users.Model");
const Course = require("./courses.Model");
const Enrollment = require("./enrollments.Model");
const CourseContent = require("./courseContent.Model");
const Project = require("./projects.Model");
const Test = require("./tests.Model");
const Rating = require("./ratings.Model");
const Review = require("./reviews.Model");
const Certificate = require("./certificates.Model");
const Score = require("./scores.Model");

// One-to-many relationship between User and Course.
Course.belongsTo(User, { foreignKey: "author_id" });
User.hasMany(Course, { foreignKey: "author_id" });

// Many-to-many relationship between User and Course through Enrollment.
User.belongsToMany(Course, { through: "Enrollment", foreignKey: "student_id" });
Course.belongsToMany(User, { through: "Enrollment", foreignKey: "course_id" });

// One-to-many relationship between Course and CourseContent.
Course.hasMany(CourseContent, { foreignKey: "course_id" });
CourseContent.belongsTo(Course, { foreignKey: "course_id" });

// One-to-many relationship between Course and Project.
Course.hasMany(Project, { foreignKey: "course_id" });
Project.belongsTo(Course, { foreignKey: "course_id" });

// One-to-many relationship between Course and Test.
Course.hasMany(Test, { foreignKey: "course_id" });
Test.belongsTo(Course, { foreignKey: "course_id" });

// Many-to-many relationship between User and Course through Rating.
User.belongsToMany(Course, { through: "Rating", foreignKey: "student_id" });
Course.belongsToMany(User, { through: "Rating", foreignKey: "course_id" });

// Many-to-many relationship between User and Course through Review.
User.belongsToMany(Course, { through: "Review", foreignKey: "student_id" });
Course.belongsToMany(User, { through: "Review", foreignKey: "course_id" });

// Many-to-many relationship between User and Course through Certificate.
User.belongsToMany(Course, {
  through: "Certificate",
  foreignKey: "student_id",
});
Course.belongsToMany(User, { through: "Certificate", foreignKey: "course_id" });

// Many-to-many relationship between User and Project through Score.
User.belongsToMany(Project, { through: "Score", foreignKey: "student_id" });
Project.belongsToMany(User, { through: "Score", foreignKey: "project_id" });

module.exports = {
  User,
  Course,
  Enrollment,
  CourseContent,
  Project,
  Test,
  Rating,
  Review,
  Certificate,
  Score,
};
