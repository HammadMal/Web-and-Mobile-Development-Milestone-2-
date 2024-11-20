const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course schema
const CourseSchema = new Schema({
  coursename: String,
  coursenameId: String,
});

// Course Time Map Schema
const CourseTimeSchema = new Schema({
  courseName: { type: String, required: true },
  courseId: { type: String, required: true },
});

// Attendance schema
const AttendanceSchema = new Schema({
  coursename: String,
  absences: Number,
  dates: [String],
});

// Grade schema
const GradeSchema = new Schema({
  coursename: String,
  grade: String,
  credits: Number, // Adding credits field here
});

// Past course grade schema
const PastCourseGradeSchema = new Schema({
  coursename: String,
  grade: String,
  credits: Number, // Adding credits field here
});

// Task schema
const TaskSchema = new Schema({
  dueDate: String,
  taskName: String,
  taskType: String, // Should match a coursename or be "Personal"
});

// User schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  courses: [CourseSchema],
  course_time: {
    type: Map,
    of: CourseTimeSchema, // Updated to handle nested objects
  },
  attendance: [AttendanceSchema],
  grades: [GradeSchema],
  past_courses_grades: [PastCourseGradeSchema],
  tasks: [TaskSchema],
});

// Main schema for the entire data collection
const DataTestSchema = new Schema({
  users: [UserSchema],
});

module.exports = mongoose.model('DataTest', DataTestSchema, 'data_test'); // Ensure 'data_test' is the correct collection name
