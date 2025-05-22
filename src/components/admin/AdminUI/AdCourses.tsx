import React, { useState } from "react";
import CourseComponent from "./Course";
import LessonComponent from "../AdminUI/Lesson";
import { type Course, type Lesson } from "../../../types/types";

const AdCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);

  const handleManageLessons = (course: Course) => {
    setSelectedCourse(course);
    setIsLessonModalOpen(true);
  };

  const updateCourseLessons = (courseId: number, lessons: Lesson[]) => {
    setSelectedCourse((prev) =>
      prev && prev.id === courseId ? { ...prev, lessons } : prev
    );
  };

  return (
    <>
      <CourseComponent onManageLessons={handleManageLessons} />
      {isLessonModalOpen && (
        <LessonComponent
          course={selectedCourse}
          isOpen={isLessonModalOpen}
          onClose={() => setIsLessonModalOpen(false)}
          updateCourseLessons={updateCourseLessons}
        />
      )}
    </>
  );
};

export default AdCourses;