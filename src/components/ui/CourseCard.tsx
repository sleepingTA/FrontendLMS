import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCourses } from '../../store/slices/courseSlice';
import DataScience from '../../assets/images/datascience.png';
import '../../index.css';

const ListCourse = () => {
  const dispatch = useAppDispatch();
  const { courses, status, error } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCourses());
    }
  }, [status, dispatch]);


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const baseUrl = 'http://localhost:3000';
  return (
    <div className="list-course-card grid-cols-12 grid gap-[70px] px-[100px]">
      {courses.map((course) => (
        <div key={course.id} className="course-card">
          <div className="course-card-image w-[285px] h-[200px] bg-[#3DCBB1] rounded-[12px]">
          <img
              src={course.thumbnail_url ? `${baseUrl}${course.thumbnail_url}` : DataScience} 
              alt={course.title}
              className="w-[285px] h-[135px]"
              onError={(e) => {
                console.error('Error loading image:', e);
                e.currentTarget.src = DataScience; 
              }}
              
            />
          </div>
          <div className="course-card-title text-[16px] font-bold mt-2">
            {course.title}
          </div>
          <div className="course-card-description text-[16px] mt-2">
            {course.description}
          </div>
          <div className="course-card-button mt-4">
            <div className="flex mr-[165px]">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ms-1 ${
                    index < Math.floor(Number(course.rating) || 4)
                      ? 'text-yellow-300'
                      : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <div className="price py-[20px] flex items-center gap-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
              <span className="text-[16px] font-bold text-[#3DCBB1]">
                $ {course.discounted_price || '99.99'}
              </span>
              {course.discount_percentage !== '0' && (
                <span className="text-[16px] font-bold text-gray-500 line-through">
                  $ {course.price || '199.99'} 
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCourse;