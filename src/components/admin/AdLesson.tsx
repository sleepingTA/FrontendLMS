import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Plus, ArrowLeft, X } from "lucide-react";
import { getLessonsByCourse, createLesson, updateLesson, deleteLesson } from "../../services/LessonService";
import { Lesson } from "../../types/types";

interface AdLessonsProps {
  courseId: number;
  onBack: () => void;
}

const AdLessons: React.FC<AdLessonsProps> = ({ courseId, onBack }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editLesson, setEditLesson] = useState<Lesson | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonsData = await getLessonsByCourse(courseId);
        setLessons(lessonsData);
      } catch (error: any) {
        setError(error.message || "Không thể tải danh sách bài học");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const numericOrder = Number(orderNumber) || 0;
      if (!lessonTitle) throw new Error("Vui lòng nhập tiêu đề bài học");
      if (isNaN(numericOrder) || numericOrder < 0) throw new Error("Thứ tự bài học không hợp lệ");

      const lessonData = {
        title: lessonTitle,
        description: lessonDescription || undefined,
        order_number: numericOrder,
      };

      const lessonId = await createLesson(courseId, lessonData);
      const newLesson: Lesson = {
        id: lessonId,
        course_id: courseId,
        title: lessonTitle,
        description: lessonDescription,
        order_number: numericOrder,
      };
      setLessons((prev) => [...prev, newLesson]);
      setShowAdd(false);
      resetForm();
    } catch (error: any) {
      setError(error.message || "Không thể thêm bài học");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLesson || !editLesson.id) {
      setError("Không tìm thấy bài học để cập nhật");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const numericOrder = Number(orderNumber) || 0;
      if (!lessonTitle) throw new Error("Vui lòng nhập tiêu đề bài học");
      if (isNaN(numericOrder) || numericOrder < 0) throw new Error("Thứ tự bài học không hợp lệ");

      const lessonData = {
        title: lessonTitle,
        description: lessonDescription || undefined,
        order_number: numericOrder,
      };

      await updateLesson(editLesson.id, lessonData);
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === editLesson.id
            ? { ...lesson, title: lessonTitle, description: lessonDescription, order_number: numericOrder }
            : lesson
        )
      );
      setShowAdd(false);
      setEditLesson(null);
      resetForm();
    } catch (error: any) {
      setError(error.message || "Không thể cập nhật bài học");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài học này?")) return;
    setLoading(true);
    setError(null);
    try {
      await deleteLesson(lessonId);
      setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId));
    } catch (error: any) {
      setError(error.message || "Không thể xóa bài học");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setLessonTitle("");
    setLessonDescription("");
    setOrderNumber("");
    setEditLesson(null);
  };

  const handleEditClick = (lesson: Lesson) => {
    setEditLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonDescription(lesson.description || "");
    setOrderNumber(lesson.order_number?.toString() || "");
    setShowAdd(true);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col bg-gray-50 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition-all duration-200"
            onClick={onBack}
            title="Quay lại khóa học"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Quản lý bài học (Khóa học ID: {courseId})</h2>
        </div>
        <button
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            setEditLesson(null);
            resetForm();
            setShowAdd(true);
          }}
          disabled={loading}
        >
          <Plus className="inline w-5 h-5 mr-2" /> Thêm bài học
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">Đang tải...</p>
      ) : lessons.length === 0 ? (
        <p className="text-center text-gray-600">Không có bài học nào</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-semibold">ID</th>
                <th className="p-4 text-left text-sm font-semibold">Tiêu đề</th>
                <th className="p-4 text-left text-sm font-semibold">Mô tả</th>
                <th className="p-4 text-left text-sm font-semibold">Thứ tự</th>
                <th className="p-4 text-left text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lessons.map((lesson, idx) => (
                <tr
                  key={lesson.id}
                  className={`${idx % 2 !== 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all duration-200`}
                >
                  <td className="p-4 text-[15px] text-gray-900 font-medium">{lesson.id}</td>
                  <td className="p-4 text-[15px] text-gray-900 font-medium">{lesson.title}</td>
                  <td className="p-4 text-[15px] text-gray-600 font-medium">{lesson.description || "N/A"}</td>
                  <td className="p-4 text-[15px] text-gray-600 font-medium">{lesson.order_number || 0}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                        title="Chỉnh sửa"
                        onClick={() => handleEditClick(lesson)}
                        disabled={loading}
                      >
                        <MdEdit className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                        title="Xóa"
                        onClick={() => handleDeleteLesson(lesson.id)}
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
      {showAdd && (
        <LessonForm
          editLesson={editLesson}
          error={error}
          loading={loading}
          lessonTitle={lessonTitle}
          setLessonTitle={setLessonTitle}
          lessonDescription={lessonDescription}
          setLessonDescription={setLessonDescription}
          orderNumber={orderNumber}
          setOrderNumber={setOrderNumber}
          onSubmit={editLesson ? handleEditLesson : handleAddLesson}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
};

interface LessonFormProps {
  editLesson: Lesson | null;
  error: string | null;
  loading: boolean;
  lessonTitle: string;
  setLessonTitle: (value: string) => void;
  lessonDescription: string;
  setLessonDescription: (value: string) => void;
  orderNumber: string;
  setOrderNumber: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  editLesson,
  error,
  loading,
  lessonTitle,
  setLessonTitle,
  lessonDescription,
  setLessonDescription,
  orderNumber,
  setOrderNumber,
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
          {editLesson ? "Cập nhật bài học" : "Thêm bài học"}
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-6 text-center bg-red-50 p-3 rounded-lg">{error}</p>
        )}
        <div className="grid grid-cols-1 gap-6">
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Tiêu đề bài học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Mô tả
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
              rows={5}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600 transition-all duration-200">
              Thứ tự bài học
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              min="0"
              step="1"
            />
          </div>
          <div className="flex gap-4 pt-4">
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
              {loading ? "Đang lưu..." : editLesson ? "Lưu bài học" : "Thêm bài học"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdLessons;