import React from 'react';
import { Link } from 'react-router-dom';

// Giả lập dữ liệu giáo viên
const educator = {
  name: 'Jane Doe',
};

// Giả lập dữ liệu khóa học
const fakeCourse = {
  _id: 'course123',
  courseThumbnail: 'https://via.placeholder.com/400x200.png?text=Course+Thumbnail',
  courseTitle: 'Learn TypeScript in 10 Days',
  coursePrice: 100,
  discount: 20,
  educator,
};

const currency = '$';

const CourseCard: React.FC = () => {
  const discountedPrice = (fakeCourse.coursePrice - (fakeCourse.discount * fakeCourse.coursePrice) / 100).toFixed(2);

  return (
    <Link
      to={`/course/${fakeCourse._id}`}
      className="border border-gray-500/300 pb-6 overflow-hidden rounded-lg"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img className="w-full" src={fakeCourse.courseThumbnail} alt={fakeCourse.courseTitle} />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{fakeCourse.courseTitle}</h3>
        <p className="text-gray-500">{fakeCourse.educator.name}</p>
        <p className="text-sm text-yellow-500 mb-1">⭐ 4.5 Rating (Fake)</p>
        <p className="text-base font-semibold text-gray-800">
          {currency} {discountedPrice}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
