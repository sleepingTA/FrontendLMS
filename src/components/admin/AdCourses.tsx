import React, { useState, useEffect } from "react";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Plus, X } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "../../services/CourseService";
import { getAllCategories } from "../../services/CategoryService";
import { Course, Category } from "../../types/types";

const API_URL = 'http://localhost:3000';

const AdCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | string>("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coursesData, categoriesData] = await Promise.all([getAllCourses(), getAllCategories()]);
        const normalizedCourses = coursesData.map((course) => ({
          ...course,
          id: Number(course.id), // Đảm bảo id là số
          price: Number(course.price) || 0,
          discount_percentage: Number(course.discount_percentage) || 0,
          discounted_price: Number(course.discounted_price) || Number(course.price) * (1 - (Number(course.discount_percentage) || 0) / 100),
          thumbnail_url: course.thumbnail_url ? `${API_URL}${course.thumbnail_url}` : undefined,
        })).filter((course) => !isNaN(course.id)); // Loại bỏ các khóa học có id không hợp lệ
        setCourses(normalizedCourses);
        setFilteredCourses(normalizedCourses);
        setCategories(categoriesData);
      } catch (error: any) {
        console.error("Error fetching data:", error.message, error.response?.data);
        setError(error.message || "Không thể tải danh sách khóa học hoặc danh mục");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  useEffect(() => {
    if (thumbnail) {
      const previewUrl = URL.createObjectURL(thumbnail);
      setThumbnailPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnail]);

const handleAddCourse = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const numericPrice = Number(price);
    const numericDiscount = Number(discountPercentage) || 0;
    if (isNaN(numericPrice) || numericPrice < 0) throw new Error("Giá không hợp lệ");
    if (numericDiscount < 0 || numericDiscount > 100) throw new Error("Phần trăm giảm giá không hợp lệ");
    if (!categoryId || isNaN(Number(categoryId))) throw new Error("Vui lòng chọn danh mục hợp lệ");

    const formData = new FormData();
    formData.append("title", courseTitle);
    if (courseDescription) formData.append("description", courseDescription);
    formData.append("category_id", categoryId.toString());
    formData.append("price", numericPrice.toString());
    if (discountPercentage) formData.append("discount_percentage", numericDiscount.toString());
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("is_active", isActive ? "1" : "0");

    console.log("Sending formData to createCourse:", Object.fromEntries(formData));

    const courseId = await createCourse(formData);

    const newCourse: Course = {
      id: courseId,
      title: courseTitle,
      description: courseDescription,
      category_id: Number(categoryId),
      created_by: 0,
      price: numericPrice,
      discount_percentage: numericDiscount,
      discounted_price: numericPrice * (1 - numericDiscount / 100),
      thumbnail_url: thumbnail ? undefined : undefined,
      is_active: isActive,
      created_at: new Date().toISOString(),
    };
    setCourses((prev) => [...prev, newCourse]);
    setShowAdd(false);
    resetForm();
  } catch (error: any) {
    console.error("Error creating course:", error.message, error.response?.data);
    setError(error.response?.data?.message || error.message || "Không thể thêm khóa học");
  } finally {
    setLoading(false);
  }
};

const handleEditCourse = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editCourse || !editCourse.id || isNaN(Number(editCourse.id))) {
    setError("Không tìm thấy khóa học để cập nhật hoặc ID không hợp lệ. Vui lòng thử lại.");
    return;
  }
  setLoading(true);
  setError(null);
  try {
    const numericPrice = Number(price);
    const numericDiscount = Number(discountPercentage) || 0;
    if (isNaN(numericPrice) || numericPrice < 0) throw new Error("Giá không hợp lệ");
    if (numericDiscount < 0 || numericDiscount > 100) throw new Error("Phần trăm giảm giá không hợp lệ");
    if (!categoryId || isNaN(Number(categoryId))) throw new Error("Vui lòng chọn danh mục hợp lệ");

    const formData = new FormData();
    if (courseTitle) formData.append("title", courseTitle);
    if (courseDescription) formData.append("description", courseDescription);
    if (categoryId) formData.append("category_id", categoryId.toString());
    if (price) formData.append("price", numericPrice.toString());
    if (discountPercentage) formData.append("discount_percentage", numericDiscount.toString());
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("is_active", isActive ? "1" : "0");

    const courseId = Number(editCourse.id);
    console.log("Sending formData to updateCourse for id", courseId, ":", Object.fromEntries(formData));

    await updateCourse(courseId, formData);

    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              title: courseTitle || course.title,
              description: courseDescription || course.description,
              category_id: Number(categoryId) || course.category_id,
              price: numericPrice || course.price,
              discount_percentage: numericDiscount || course.discount_percentage,
              discounted_price: numericPrice * (1 - numericDiscount / 100),
              thumbnail_url: thumbnail ? undefined : course.thumbnail_url,
              is_active: isActive,
            }
          : course
      )
    );
    setShowAdd(false);
    setEditCourse(null);
    resetForm();
  } catch (error: any) {
    console.error("Error updating course:", error.message, error.response?.data);
    setError(error.response?.data?.message || error.message || "Không thể cập nhật khóa học");
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
      console.error("Error deleting course:", error.message, error.response?.data);
      setError(error.message || "Không thể xóa khóa học");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCourseTitle("");
    setCourseDescription("");
    setCategoryId("");
    setPrice("");
    setDiscountPercentage("");
    setThumbnail(null);
    setThumbnailPreview(null);
    setIsActive(true);
  };

  const handleEditClick = (course: Course) => {
    console.log("Editing course:", course); // Debug để kiểm tra course.id
    if (!course || isNaN(Number(course.id))) {
      setError("Dữ liệu khóa học không hợp lệ. Vui lòng làm mới trang.");
      return;
    }
    setEditCourse(course);
    setCourseTitle(course.title);
    setCourseDescription(course.description || "");
    setCategoryId(course.category_id);
    setPrice(course.price.toString());
    setDiscountPercentage(course.discount_percentage?.toString() || "");
    setIsActive(course.is_active || true);
    setThumbnail(null);
    setThumbnailPreview(null);
    setShowAdd(true);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý khóa học</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800 placeholder-gray-400"
              placeholder="Tìm kiếm theo tên hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <button
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setEditCourse(null);
              resetForm();
              setShowAdd(true);
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
                  <th className="p-4 text-left text-sm font-semibold">Thumbnail</th>
                  <th className="p-4 text-left text-sm font-semibold">Tên khóa học</th>
                  <th className="p-4 text-left text-sm font-semibold">Danh mục</th>
                  <th className="p-4 text-left text-sm font-semibold">Giá</th>
                  <th className="p-4 text-left text-sm font-semibold">Phần trăm giảm giá</th>
                  <th className="p-4 text-left text-sm font-semibold">Giá sau giảm</th>
                  <th className="p-4 text-left text-sm font-semibold">Trạng thái</th>
                  <th className="p-4 text-left text-sm font-semibold">Ngày tạo</th>
                  <th className="p-4 text-left text-sm font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCourses.map((course, idx) => (
                  <tr
                    key={course.id}
                    className={`${idx % 2 !== 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all duration-200`}
                  >
                    <td className="p-4 text-[15px] text-gray-900 font-medium">{course.id}</td>
                    <td className="p-4">
                      {course.thumbnail_url ? (
                        <img src={course.thumbnail_url} alt={course.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <span className="text-gray-600">Không có ảnh</span>
                      )}
                    </td>
                    <td className="p-4 text-[15px] text-gray-900 font-medium">{course.title}</td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {categories.find((cat) => cat.id === course.category_id)?.name || "N/A"}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {(Number(course.price) || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {(Number(course.discount_percentage) || 0).toFixed(2)}%
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {(Number(course.discounted_price) || Number(course.price) * (1 - (Number(course.discount_percentage) || 0) / 100)).toFixed(2)}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {course.is_active ? "Kích hoạt" : "Không kích hoạt"}
                    </td>
                    <td className="p-4 text-[15px] text-gray-600 font-medium">
                      {course.created_at ? new Date(course.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                          title="Chỉnh sửa"
                          onClick={() => handleEditClick(course)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showAdd && (
        <CourseForm
          editCourse={editCourse}
          error={error}
          loading={loading}
          courseTitle={courseTitle}
          setCourseTitle={setCourseTitle}
          courseDescription={courseDescription}
          setCourseDescription={setCourseDescription}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          price={price}
          setPrice={setPrice}
          discountPercentage={discountPercentage}
          setDiscountPercentage={setDiscountPercentage}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          thumbnailPreview={thumbnailPreview}
          isActive={isActive}
          setIsActive={setIsActive}
          categories={categories}
          onSubmit={editCourse ? handleEditCourse : handleAddCourse}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
};

interface CourseFormProps {
  editCourse: Course | null;
  error: string | null;
  loading: boolean;
  courseTitle: string;
  setCourseTitle: (value: string) => void;
  courseDescription: string;
  setCourseDescription: (value: string) => void;
  categoryId: number | string;
  setCategoryId: (value: number | string) => void;
  price: string;
  setPrice: (value: string) => void;
  discountPercentage: string;
  setDiscountPercentage: (value: string) => void;
  thumbnail: File | null;
  setThumbnail: (file: File | null) => void;
  thumbnailPreview: string | null;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  categories: Category[];
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  editCourse,
  error,
  loading,
  courseTitle,
  setCourseTitle,
  courseDescription,
  setCourseDescription,
  categoryId,
  setCategoryId,
  price,
  setPrice,
  discountPercentage,
  setDiscountPercentage,
  thumbnail,
  setThumbnail,
  thumbnailPreview,
  isActive,
  setIsActive,
  categories,
  onSubmit,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 mt-10 mb-10 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={onClose}
        >
          <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          {editCourse ? "Cập nhật khóa học" : "Thêm khóa học"}
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-6 text-center bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative md:col-span-2">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Tên khóa học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative md:col-span-2">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Mô tả
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={5}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Phần trăm giảm giá
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Thumbnail
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              accept="image/*"
            />
            {(thumbnailPreview || (editCourse?.thumbnail_url && !thumbnail)) && (
              <img
                src={thumbnailPreview || `${API_URL}${editCourse?.thumbnail_url}`}
                alt="Thumbnail preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg shadow-sm"
              />
            )}
          </div>
          <div className="flex items-center gap-3 md:col-span-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-600">Kích hoạt khóa học</label>
          </div>
          <div className="flex gap-4 pt-4 md:col-span-2">
            <button
              type="button"
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : editCourse ? "Lưu khóa học" : "Thêm khóa học"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdCourses;