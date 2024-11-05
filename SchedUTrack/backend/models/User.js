const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course schema
const CourseSchema = new Schema({
  coursename: String,
  coursenameId: String
});

// Attendance schema
const AttendanceSchema = new Schema({
  coursename: String,
  absences: Number
});

// Grade schema
const GradeSchema = new Schema({
  coursename: String,
  grade: String
});

// Past course grade schema
const PastCourseGradeSchema = new Schema({
  past_coursename: String,
  past_course_grade: String
});

// Task schema
const TaskSchema = new Schema({
  dueDate: String,
  taskName: String,
  taskType: String // Should match a coursename or be "Personal"
});

// User schema
const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  courses: [CourseSchema],
  attendance: [AttendanceSchema],
  grades: [GradeSchema],
  past_courses: [String],
  past_course_grades: [PastCourseGradeSchema],
  tasks: [TaskSchema] // Add tasks array here
});

// Main schema for the entire data collection
const DataTestSchema = new Schema({
  users: [UserSchema]
});

module.exports = mongoose.model('DataTest', DataTestSchema, 'data_test');
