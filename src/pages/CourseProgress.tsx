import React from 'react'

const CourseProgress = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* VIDEO HỌC */}
        <div className="w-full lg:w-2/3">
          <video
            className="w-full rounded-lg shadow-md"
            controls           
          >
            <source src="/videos/lesson1.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <h2 className="text-xl font-semibold mt-4 text-slate-800">1. Giới thiệu khóa học</h2>
          <p className="text-sm text-slate-500 mt-2">
            Đây là video giới thiệu tổng quan về nội dung bạn sắp học trong khóa học này.
          </p>
        </div>

        {/* TIẾN TRÌNH HỌC */}
        <div className="w-full lg:w-1/3 space-y-6">
          <h3 className="text-lg font-semibold text-slate-800">Tiến trình học tập</h3>

          <div>
            <div className="bg-gray-200 h-4 rounded-full">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-sm text-slate-500 mt-1">2 / 5 bài học đã hoàn thành</p>
          </div>

          <ul className="space-y-3">
            {[
              { title: '1. Giới thiệu khóa học', done: true },
              { title: '2. Thiết lập môi trường', done: true },
              { title: '3. Cấu trúc dự án', done: false },
              { title: '4. Xây dựng chức năng', done: false },
              { title: '5. Tổng kết', done: false }
            ].map((lesson, idx) => (
              <li key={idx} className={`flex justify-between items-center p-3 rounded-md border ${lesson.done ? 'bg-green-50' : 'bg-white'}`}>
                <span className={`${lesson.done ? 'line-through text-green-700' : 'text-slate-700'}`}>
                  {lesson.done ? '✔️ ' : ''}{lesson.title}
                </span>
                {!lesson.done && (
                  <button className="text-sm text-blue-600 hover:bg-gray-100 cursor-pointer">Tiếp tục</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress
