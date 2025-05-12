import React from 'react'
import CourseCard from '../components/ui/CourseCard'
import FilterForm from '../components/form/FilterForm';
import ListCourse from '../components/ui/CourseCard';

const CoursePage = () => {
  return (
    <>
      <div className="pt-20">
        <div className="main flex justify-center items-center px-[120px] py-[20px]">
          <h1 className="text-2xl font-bold">Course Page</h1>
        </div>
        <FilterForm />
        <ListCourse />
      </div>
    </>
  )
}

export default CoursePage;
