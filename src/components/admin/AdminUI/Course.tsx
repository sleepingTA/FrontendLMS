import React, { useState, useEffect } from "react";
import { MdSearch, MdEdit, MdDelete, MdPeople, MdBook } from "react-icons/md";
import { Plus, X } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse, getUsersByCourse } from "../../../services/CourseService";
import { type Course, type User } from "../../../types/types";

interface CourseProps {
  onManageLessons: (course: Course) => void;
}

const Course: React.FC<CourseProps> = ({ onManageLessons }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseUsers, setCourseUsers] = useState<User[]>([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategoryId, setCourseCategoryId] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseDiscount, setCourseDiscount] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllCourses();
        
        data.forEach((course, index) => {
          if (course.avg_rating == null && course.rating == null) {
            console.warn(`Course ${course.id} (index ${index}) has no avg_rating or rating`);
          } else if (typeof course.avg_rating !== 'number' && typeof course.rating !== 'number') {
            console.warn(`Course ${course.id} (index ${index}) has invalid rating:`, {
              avg_rating: course.avg_rating,
              rating: course.rating
            });
          }
        });
        setCourses(data);
        setFilteredCourses(data);
      } catch (error: any) {
        setError(error.message || "Không thể tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const courseId = await createCourse({
        title: courseTitle,
        description: courseDescription,
        category_id: parseInt(courseCategoryId),
        price: parseFloat(coursePrice),
        discount_percentage: parseFloat(courseDiscount) || 0,
        thumbnail_url: courseThumbnail,
        is_active: true,
      });
      const newCourse: Course = {
        id: courseId,
        title: courseTitle,
        description: courseDescription,
        category_id: parseInt(courseCategoryId),
        created_by: 1, // Giả định user ID
        price: parseFloat(coursePrice),
        discount_percentage: parseFloat(courseDiscount) || 0,
        thumbnail_url: courseThumbnail,
        is_active: true,
        created_at: new Date().toISOString(),
        lessons: [],
        total_students: 0,
        avg_rating: 0,
      };
      setCourses((prev) => [...prev, newCourse]);
      setIsCourseModalOpen(false);
      resetCourseForm();
    } catch (error: any) {
      setError(error.message || "Không thể thêm khóa học");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setLoading(true);
    setError(null);
    try {
      await updateCourse(selectedCourse.id, {
        title: courseTitle,
        description: courseDescription,
        category_id: parseInt(courseCategoryId),
        price: parseFloat(coursePrice),
        discount_percentage: parseFloat(courseDiscount) || 0,
        thumbnail_url: courseThumbnail,
      });
      setCourses((prev) =>
        prev.map((course) =>
          course.id === selectedCourse.id
            ? {
                ...course,
                title: courseTitle,
                description: courseDescription,
                category_id: parseInt(courseCategoryId),
                price: parseFloat(coursePrice),
                discount_percentage: parseFloat(courseDiscount) || 0,
                thumbnail_url: courseThumbnail,
              }
            : course
        )
      );
      setIsCourseModalOpen(false);
      resetCourseForm();
    } catch (error: any) {
      setError(error.message || "Không thể cập nhật khóa học");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa khóa học này?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error: any) {
      setError(error.message || "Không thể xóa khóa học");
    } finally {
      setLoading(false);
    }
  };

  const handleViewUsers = async (course: Course) => {
    setSelectedCourse(course);
    setLoading(true);
    try {
      const users = await getUsersByCourse(course.id);
      setCourseUsers(users);
      setIsUsersModalOpen(true);
    } catch (error: any) {
      setError(error.message || "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setCourseTitle("");
    setCourseDescription("");
    setCourseCategoryId("");
    setCoursePrice("");
    setCourseDiscount("");
    setCourseThumbnail("");
    setSelectedCourse(null);
  };

  const formatVND = (amount: number) => {
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };

  const finalPrice = (price: number, percent: number) => {
    return price - (price * percent) / 100;
  };

  const renderStars = (rating: number | undefined | null) => {
    const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;
    const rounded = Math.round(safeRating);
    return (
      <span>
        {Array(rounded)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
        {Array(5 - rounded)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
        <span className="ml-1 text-xs text-gray-600">({safeRating.toFixed(1)})</span>
      </span>
    );
  };

  const renderCourseModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && setIsCourseModalOpen(false)}
    >
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={selectedCourse ? handleEditCourse : handleAddCourse}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={() => setIsCourseModalOpen(false)}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {selectedCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="space-y-6">
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Mô tả
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Danh mục ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={courseCategoryId}
              onChange={(e) => setCourseCategoryId(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Giá (VND) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Giảm giá (%)
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={courseDiscount}
              onChange={(e) => setCourseDiscount(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              URL hình ảnh
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={courseThumbnail}
              onChange={(e) => setCourseThumbnail(e.target.value)}
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
              onClick={() => setIsCourseModalOpen(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : selectedCourse ? "Lưu khóa học" : "Thêm khóa học"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const renderUsersModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && setIsUsersModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={() => setIsUsersModalOpen(false)}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          Người dùng đăng ký - {selectedCourse?.title}
        </h2>
        {courseUsers.length === 0 ? (
          <p className="text-gray-600 text-center">Không có người dùng nào đăng ký</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {courseUsers.map((user) => (
              <li key={user.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-gray-800">{user.full_name}</span>
                </div>
                <span className="text-gray-600">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const baseUrl = "http://localhost:3000"; 
  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý khóa học</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              resetCourseForm();
              setIsCourseModalOpen(true);
            }}
            disabled={loading}
          >
            <Plus className="inline w-5 h-5 mr-2" /> Thêm khóa học
          </button>
        </div>
      </div>
      <div className="w-full flex-grow p-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading ? (
          <p className="text-center text-gray-600">Đang tải...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-gray-600">Không tìm thấy khóa học</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">ID</th>
                  <th className="p-4 text-left text-sm font-semibold">Tiêu đề</th>
                  <th className="p-4 text-left text-sm font-semibold">Danh mục</th>
                  <th className="p-4 text-left text-sm font-semibold">Giá</th>
                  <th className="p-4 text-left text-sm font-semibold">Giảm giá</th>
                  <th className="p-4 text-left text-sm font-semibold">Giá cuối</th>
                  <th className="p-4 text-left text-sm font-semibold">Hình ảnh</th>
                  <th className="p-4 text-left text-sm font-semibold">Số học viên</th>
                  <th className="p-4 text-left text-sm font-semibold">Đánh giá</th>
                  <th className="p-4 text-left text-sm font-semibold">Ngày tạo</th>
                  <th className="p-4 text-left text-sm font-semibold">Hành động</th>
                  <th className="p-4 text-left text-sm font-semibold">Bài học</th>
                  <th className="p-4 text-left text-sm font-semibold">Người dùng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course, idx) => (
                  <tr
                    key={course.id}
                    className={`${idx % 2 !== 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all duration-200`}
                  >
                    <td className="p-4 text-[15px] text-gray-900 font-medium">{course.id}</td>
                    <td className="p-4 text-[15px] text-gray-900 font-medium">{course.title}</td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">{course.category_id}</td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {formatVND(course.price)}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {course.discount_percentage || 0}%
                    </td>
                    <td className="p-4 text-[15px] text-green-600 font-medium">
                      {formatVND(course.discounted_price || finalPrice(course.price, course.discount_percentage || 0))}
                    </td>
                    <td className="p-4">
                      {course.thumbnail_url ? (
                        <img
                          src={`${baseUrl}${course.thumbnail_url}`} 
                          alt={course.title}
                          className="w-16 h-12 rounded object-fit"
                        />
                      ) : (
                        "Không có hình"
                      )}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium text-center">
                      {course.total_students || 0}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {renderStars(course.total_ratings ?? course.rating ?? 0)}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {course.created_at
                        ? new Date(course.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                          title="Chỉnh sửa"
                          onClick={() => {
                            setSelectedCourse(course);
                            setCourseTitle(course.title);
                            setCourseDescription(course.description || "");
                            setCourseCategoryId(course.category_id.toString());
                            setCoursePrice(course.price.toString());
                            setCourseDiscount((course.discount_percentage || 0).toString());
                            setCourseThumbnail(course.thumbnail_url || "");
                            setIsCourseModalOpen(true);
                          }}
                          disabled={loading}
                        >
                          <MdEdit className="w-5 h-5 text-blue-500" />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                          title="Xóa"
                          onClick={() => handleDeleteCourse(course.id)}
                          disabled={loading}
                        >
                          <MdDelete className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                        title="Quản lý bài học"
                        onClick={() => onManageLessons(course)}
                        disabled={loading}
                      >
                        <MdBook className="w-5 h-5 text-indigo-500" />
                        <span className="ml-1 text-indigo-500">
                          ({course.lessons?.length || 0})
                        </span>
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                        title="Xem người dùng"
                        onClick={() => handleViewUsers(course)}
                        disabled={loading}
                      >
                        <MdPeople className="w-5 h-5 text-pink-500" />
                        <span className="ml-1 text-pink-500">
                          ({course.total_students || 0})
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isCourseModalOpen && renderCourseModal()}
      {isUsersModalOpen && renderUsersModal()}
    </div>
  );
};

export default Course;