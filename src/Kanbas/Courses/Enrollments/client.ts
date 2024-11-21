import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (courseId: string) => {
  try {
    await axios.put(`${ENROLLMENTS_API}`, { courseId }); // Only pass courseId
  } catch (error) {
    console.error("Failed to enroll in course", error);
    throw error;
  }
};

export const unenrollUserInCourse = async (courseId: string) => {
  try {
    await axios.delete(`${ENROLLMENTS_API}`, { data: { courseId } }); // Axios requires { data } for DELETE payloads
  } catch (error) {
    console.error("Failed to unenroll from course", error);
    throw error;
  }
};