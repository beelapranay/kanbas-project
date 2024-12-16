import model from "./model.js";
import { findCoursesForUser } from "../Enrollments/dao.js"; 

export function findAllCourses() {
  return model.find();
}
export async function findCoursesForEnrolledUser(userId) {
  try {
    const enrolledCourses = await findCoursesForUser(userId);
    return model.find({ number:  { $in: enrolledCourses } });
  } catch (error) {
    console.error("Error fetching courses for user:", error);
    throw error;
  }
}
export function createCourse(course) {
  delete course._id;
  return model.create(course);
}
export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 } 
