import React, { useEffect, useState } from 'react';
import CategoryFilterDropdown from '../components/ui/CategoryFilterDropdown';
import { getAllCourses } from '../services/CourseService';
import { Course } from '../types/types';
import PriceFilterDropdown from '../components/ui/PriceFilterDropdown';
import RatingFilterDropdown from '../components/ui/RatingFilterDropdown';

export default function CourseCategory() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Đảm bảo loading được set lại
      setError(null);
      try {
        const data = await getAllCourses();
        console.log('Fetched Courses:', data);
        setCourses([...data]); // Tạo mảng mới để đảm bảo state thay đổi
      } catch (err: any) {
        console.error('Failed to load courses:', err);
        setError(err.message || 'Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Log state courses sau mỗi lần cập nhật
  useEffect(() => {
    console.log('State Courses Updated:', courses);
  }, [courses]);
  const baseUrl = 'http://localhost:3000'
  return (
    <div className="py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-w-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">Find your course</h2>
      <div className="flex">
        <CategoryFilterDropdown />
        <PriceFilterDropdown />
        <RatingFilterDropdown />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-6 mb-6 font-bold">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No courses available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all"
            >
              <div className="w-full aspect-[41/50] overflow-hidden mx-auto">
                <img
                  src={course.thumbnail_url ? `${baseUrl}${course.thumbnail_url}` : 'https://via.placeholder.com/300x300?text=No+Image'}
                  alt={course.title || 'Course Image'}
                  className="h-full w-full object-contain"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image')}
                />
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mt-4">{course.title || 'No Title'}</h3>
              <p className="text-gray-600 text-sm mt-1">{course.description || 'No description available'}</p>

              {/* Price */}
              <div className="mt-2">
                <div className="text-lg font-bold text-black">
                  {(course.price || 0).toLocaleString()} ₫
                </div>
                {course.discount_percentage && (
                  <div className="text-sm text-gray-500 line-through">
                    {((course.price || 0) / (1 - (course.discount_percentage || 0) / 100)).toLocaleString()} ₫
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex space-x-1.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 ${i < Math.round(course.avg_rating || 0) ? 'fill-[#facc15]' : 'fill-[#CED5D8]'}`}
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}