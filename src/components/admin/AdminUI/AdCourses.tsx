import React, { useState } from 'react'
import CourseAddForm from '../AdminForm/AddCourse';
import LessonModal from '../AdminModal/CourseModal';
import CoueseModal from '../AdminModal/CourseModal';
import UserModal from '../AdminModal/UserModal';

const courses = [
    {
        id: "C01",
        name: "ReactJS Mastery",
        category: "Web Development",
        price: 1000000,
        discountPercent: 20,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        totalUsers: 123,
        rating: 4.6,
        createdAt: "2024-02-01",
        updatedAt: "2024-05-10",
        lessons: [
            {
                id: "L01",
                title: "Giới thiệu ReactJS",
                videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
                materialUrl: "https://example.com/docs/react-intro.pdf"
            },
            {
                id: "L02",
                title: "JSX và Component",
                videoUrl: "https://www.youtube.com/embed/f55qeKGgB_M",
                materialUrl: "https://example.com/docs/jsx.pdf"
            },
        ],
        users: [
            { id: "U01", name: "Nguyễn Văn A", email: "a@gmail.com" },
            { id: "U02", name: "Trần Thị B", email: "b@gmail.com" },
        ]
    },
    {
        id: "C02",
        name: "Machine Learning Cơ Bản",
        category: "AI & Machine Learning",
        price: 2000000,
        discountPercent: 30,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400",
        totalUsers: 98,
        rating: 4.8,
        createdAt: "2023-11-21",
        updatedAt: "2024-04-28",
        lessons: [
            {
                id: "L01",
                title: "Introduction to ML",
                videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ",
                materialUrl: "https://example.com/docs/ml-intro.pdf"
            },
        ],
        users: [
            { id: "U03", name: "Phạm Minh C", email: "c@gmail.com" },
        ]
    }
];

function formatVND(amount: number) {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function finalPrice(price: number, percent: number) {
    return price - (price * percent / 100);
}

function renderStars(rating: number) {
    const rounded = Math.round(rating);
    return (
        <span>
            {Array(rounded).fill(0).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
            ))}
            {Array(5 - rounded).fill(0).map((_, i) => (
                <span key={i} className="text-gray-300">★</span>
            ))}
            <span className="ml-1 text-xs text-slate-600">({rating.toFixed(1)})</span>
        </span>
    );
}

export default function AdCourses() {
    const [openLessons, setOpenLessons] = React.useState<string | null>(null);
    const [openUsers, setOpenUsers] = React.useState<string | null>(null);
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center my-6">Courses Management</h2>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition flex items-center gap-2"
                    onClick={() => setShowAdd(true)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Course
                </button>
            </div>

            {showAdd && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <CourseAddForm
                        onSubmit={() => setShowAdd(false)}
                        onCancel={() => setShowAdd(false)}
                    />
                </div>
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Discount</th>
                            <th className="p-4 text-left">Total Price</th>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Total Users</th>
                            <th className="p-4 text-left">Rating</th>
                            <th className="p-4 text-left">Created on date</th>
                            <th className="p-4 text-left">Update</th>
                            <th className="p-4 text-left">Course</th>
                            <th className="p-4 text-left">View users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c, idx) => (
                            <tr key={c.id} className={idx % 2 !== 0 ? 'bg-blue-50' : ''}>
                                <td className="p-4 font-semibold text-slate-900">{c.id}</td>
                                <td className="p-4">{c.name}</td>
                                <td className="p-4">{c.category}</td>
                                <td className="p-4">{formatVND(c.price)}</td>
                                <td className="p-4">{c.discountPercent}%</td>
                                <td className="p-4 text-green-600 font-bold">{formatVND(finalPrice(c.price, c.discountPercent))}</td>
                                <td className="p-4">
                                    <img src={c.image} alt="course" className="w-16 h-12 object-cover rounded" />
                                </td>
                                <td className="p-4 text-center">{c.totalUsers}</td>
                                <td className="p-4">{renderStars(c.rating)}</td>
                                <td className="p-4">{c.createdAt}</td>
                                <td className="p-4">{c.updatedAt}</td>
                                <td className="p-4">
                                    <button
                                        className="text-blue-500 cursor-pointer hover:bg-gray-200"
                                        onClick={() => setOpenLessons(openLessons === c.id ? null : c.id)}
                                    >
                                        Manage {c.lessons.length}
                                    </button>
                                    {openLessons === c.id && (
                                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                            <div className="bg-white rounded shadow-lg w-full max-w-xl p-6 relative">
                                                <button className="absolute top-2 right-4 text-xl cursor-pointer hover:bg-gray-200" onClick={() => setOpenLessons(null)}>×</button>
                                                <h3 className="text-lg font-bold mb-4">Quản lý bài học - {c.name}</h3>
                                                <button
                                                    className="mb-4 px-3 py-1 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >+ Thêm bài học</button>
                                                <ul className="divide-y">
                                                    {c.lessons.map((l, idx) => (
                                                        <li key={l.id} className="py-2 flex flex-col gap-1">
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-semibold">{l.title}</span>
                                                                <div className="flex gap-2">
                                                                    <button className="text-blue-600 text-sm hover:underline cursor-pointer"
                                                                    >Sửa</button>
                                                                    <button className="text-red-500 text-sm hover:underline cursor-pointer"
                                                                    >Xóa</button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-slate-600">Video: </span>
                                                                <a href={l.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Xem video</a>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-slate-600">Tài liệu PDF: </span>
                                                                <a href={l.materialUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Tải PDF</a>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        className="text-pink-500 cursor-pointer hover:bg-gray-200"
                                        onClick={() => setOpenUsers(openUsers === c.id ? null : c.id)}
                                    >
                                        View {c.users.length}
                                    </button>

                                    {openLessons && (
                                        <CoueseModal
                                            courseName={courses.find(c => c.id === openLessons)?.name || ""}
                                            courses={courses.find(c => c.id === openLessons)?.lessons || []}
                                            onClose={() => setOpenLessons(null)}
                                            onAddLesson={course => {
                                                alert('Demo: Đã thêm bài học mới!');
                                            }}
                                            onDeleteLesson={courseId => {
                                                alert('Demo: Đã xóa bài học!');
                                            }}
                                        />
                                    )}

                                    {openUsers === c.id && (
                                        <UserModal
                                            courseName={c.name}
                                            users={c.users}
                                            onClose={() => setOpenUsers(null)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

