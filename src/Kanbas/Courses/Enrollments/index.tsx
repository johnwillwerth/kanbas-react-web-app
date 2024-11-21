import * as enrollmentsClient from "./client";
import * as usersClient from "../../Account/client";
import { useSelector, useDispatch } from "react-redux";
import { setEnrollments, addEnrollment, removeEnrollment } from "./reducer";
import { useEffect, useState } from "react";

export default function Enrollments() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [loading, setLoading] = useState(true);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer || { enrollments: [] });


  // Function to enroll user in a course
  const enrollUser = async (courseId: string) => {
    try {
      await enrollmentsClient.enrollUserInCourse(courseId);
      dispatch(addEnrollment(courseId));
    } catch (error) {
      console.error("Failed to enroll user", error);
    }
  };

  // Function to unenroll user from a course
  const unenrollUser = async (courseId: string) => {
    try {
      await enrollmentsClient.unenrollUserInCourse(courseId);
      dispatch(removeEnrollment(courseId));
    } catch (error) {
      console.error("Failed to unenroll user", error);
    }
  };

  // Fetch the list of courses the current user is enrolled in
  const fetchEnrollments = async () => {
    try {
      const enrollments = await usersClient.findCoursesForEnrolledUser(currentUser);
      dispatch(setEnrollments(enrollments || [])); // Ensure `enrollments` is always an array
    } catch (error) {
      console.error("Failed to fetch enrollments", error);
      dispatch(setEnrollments([])); // Fallback to empty array on error
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEnrollments();
    }
  }, [currentUser]);

  // Loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render the list of enrolled courses, etc. */}
      <button onClick={() => enrollUser("courseId")}>Enroll</button>
      <button onClick={() => unenrollUser("courseId")}>Unenroll</button>
    </div>
  );
}
