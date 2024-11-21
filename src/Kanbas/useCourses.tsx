import { useState, useEffect } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./Courses/Enrollments/client";

export const useCourses = (currentUser: any) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      const fetchedCourses = await userClient.findCoursesForEnrolledUser(currentUser);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })
  )};

  const enrollInCourse = async (courseId: string) => {
    await enrollmentClient.enrollUserInCourse(courseId);
    await fetchCourses();
  };

  const unenrollInCourse = async (courseId: string) => {
    await enrollmentClient.unenrollUserInCourse(courseId);
    await fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  return {
    courses,
    course,
    setCourse,
    fetchCourses,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrollInCourse,
    unenrollInCourse,
  };
};
