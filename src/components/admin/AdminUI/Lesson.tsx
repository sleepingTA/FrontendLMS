import React, { useState, useEffect, useRef } from "react";
import { MdEdit, MdDelete, MdVideoLibrary, MdInsertDriveFile } from "react-icons/md";
import { Plus, X } from "lucide-react";
import {
  getLessonsByCourse,
  createLesson,
  updateLesson,
  deleteLesson,
  addVideo,
  updateVideo,
  deleteVideo,
  addMaterial,
  updateMaterial,
  deleteMaterial,
} from "../../../services/LessonService";
import { type Lesson, type Video, type Material, type Course } from "../../../types/types";

interface LessonProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  updateCourseLessons: (courseId: number, lessons: Lesson[]) => void;
}

const Lesson: React.FC<LessonProps> = ({ course, isOpen, onClose, updateCourseLessons }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonOrder, setLessonOrder] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoOrder, setVideoOrder] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoIsPreview, setVideoIsPreview] = useState(false);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialFileUrl, setMaterialFileUrl] = useState("");
  const [materialFileType, setMaterialFileType] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!course || !isOpen || hasFetched.current) return;
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLessonsByCourse(course.id);
        setLessons(data);
        hasFetched.current = true;
      } catch (error: any) {
        setError(error.message || "Không thể tải danh sách bài học");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [course, isOpen]);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    setLoading(true);
    setError(null);
    try {
      const lessonId = await createLesson(course.id, {
        title: lessonTitle,
        description: lessonDescription,
        order_number: lessonOrder ? parseInt(lessonOrder) : undefined,
      });
      const newLesson: Lesson = {
        id: lessonId,
        course_id: course.id,
        title: lessonTitle,
        description: lessonDescription,
        order_number: lessonOrder ? parseInt(lessonOrder) : undefined,
        videos: [],
        materials: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updatedLessons = [...lessons, newLesson];
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsLessonModalOpen(false);
      resetLessonForm();
    } catch (error: any) {
      setError(error.message || "Không thể thêm bài học");
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson || !course) return;
    setLoading(true);
    setError(null);
    try {
      await updateLesson(selectedLesson.id, {
        title: lessonTitle,
        description: lessonDescription,
        order_number: lessonOrder ? parseInt(lessonOrder) : undefined,
      });
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id
          ? {
              ...lesson,
              title: lessonTitle,
              description: lessonDescription,
              order_number: lessonOrder ? parseInt(lessonOrder) : undefined,
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsLessonModalOpen(false);
      resetLessonForm();
    } catch (error: any) {
      setError(error.message || "Không thể cập nhật bài học");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài học này?") || !course) return;
    setLoading(true);
    setError(null);
    try {
      await deleteLesson(lessonId);
      const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonId);
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
    } catch (error: any) {
      setError(error.message || "Không thể xóa bài học");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson || !course) return;
    setLoading(true);
    setError(null);
    try {
      const videoId = await addVideo(selectedLesson.id, {
        title: videoTitle,
        description: videoDescription,
        video_url: videoUrl,
        order_number: videoOrder ? parseInt(videoOrder) : undefined,
        duration: videoDuration ? parseInt(videoDuration) : undefined,
        is_preview: videoIsPreview,
      });
      const newVideo: Video = {
        id: videoId,
        lesson_id: selectedLesson.id,
        title: videoTitle,
        description: videoDescription,
        video_url: videoUrl,
        order_number: videoOrder ? parseInt(videoOrder) : undefined,
        duration: videoDuration ? parseInt(videoDuration) : undefined,
        is_preview: videoIsPreview,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id
          ? {
              ...lesson,
              videos: [...(lesson.videos || []), newVideo],
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsVideoModalOpen(false);
      resetVideoForm();
    } catch (error: any) {
      setError(error.message || "Không thể thêm video");
    } finally {
      setLoading(false);
    }
  };

  const handleEditVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideo || !selectedLesson || !course) return;
    setLoading(true);
    setError(null);
    try {
      await updateVideo(selectedVideo.id, {
        title: videoTitle,
        description: videoDescription,
        video_url: videoUrl,
        order_number: videoOrder ? parseInt(videoOrder) : undefined,
        duration: videoDuration ? parseInt(videoDuration) : undefined,
        is_preview: videoIsPreview,
      });
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id
          ? {
              ...lesson,
              videos: (lesson.videos || []).map((video) =>
                video.id === selectedVideo.id
                  ? {
                      ...video,
                      title: videoTitle,
                      description: videoDescription,
                      video_url: videoUrl,
                      order_number: videoOrder ? parseInt(videoOrder) : undefined,
                      duration: videoDuration ? parseInt(videoDuration) : undefined,
                      is_preview: videoIsPreview,
                      updated_at: new Date().toISOString(),
                    }
                  : video
              ),
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsVideoModalOpen(false);
      resetVideoForm();
    } catch (error: any) {
      setError(error.message || "Không thể cập nhật video");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (lessonId: number, videoId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa video này?") || !course) return;
    setLoading(true);
    setError(null);
    try {
      await deleteVideo(videoId);
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              videos: (lesson.videos || []).filter((video) => video.id !== videoId),
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
    } catch (error: any) {
      setError(error.message || "Không thể xóa video");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson || !course) return;
    setLoading(true);
    setError(null);
    try {
      const materialId = await addMaterial(selectedLesson.id, {
        title: materialTitle,
        file_url: materialFileUrl,
        file_type: materialFileType,
      });
      const newMaterial: Material = {
        id: materialId,
        lesson_id: selectedLesson.id,
        title: materialTitle,
        file_url: materialFileUrl,
        file_type: materialFileType,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id
          ? {
              ...lesson,
              materials: [...(lesson.materials || []), newMaterial],
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsMaterialModalOpen(false);
      resetMaterialForm();
    } catch (error: any) {
      setError(error.message || "Không thể thêm tài liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial || !selectedLesson || !course) return;
    setLoading(true);
    setError(null);
    try {
      await updateMaterial(selectedMaterial.id, {
        title: materialTitle,
        file_url: materialFileUrl,
        file_type: materialFileType,
      });
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === selectedLesson.id
          ? {
              ...lesson,
              materials: (lesson.materials || []).map((material) =>
                material.id === selectedMaterial.id
                  ? {
                      ...material,
                      title: materialTitle,
                      file_url: materialFileUrl,
                      file_type: materialFileType,
                      updated_at: new Date().toISOString(),
                    }
                  : material
              ),
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
      setIsMaterialModalOpen(false);
      resetMaterialForm();
    } catch (error: any) {
      setError(error.message || "Không thể cập nhật tài liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMaterial = async (lessonId: number, materialId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài liệu này?") || !course) return;
    setLoading(true);
    setError(null);
    try {
      await deleteMaterial(materialId);
      const updatedLessons = lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              materials: (lesson.materials || []).filter((material) => material.id !== materialId),
              updated_at: new Date().toISOString(),
            }
          : lesson
      );
      setLessons(updatedLessons);
      updateCourseLessons(course.id, updatedLessons);
    } catch (error: any) {
      setError(error.message || "Không thể xóa tài liệu");
    } finally {
      setLoading(false);
    }
  };

  const resetLessonForm = () => {
    setLessonTitle("");
    setLessonDescription("");
    setLessonOrder("");
    setSelectedLesson(null);
  };

  const resetVideoForm = () => {
    setVideoTitle("");
    setVideoDescription("");
    setVideoUrl("");
    setVideoOrder("");
    setVideoDuration("");
    setVideoIsPreview(false);
    setSelectedVideo(null);
  };

  const resetMaterialForm = () => {
    setMaterialTitle("");
    setMaterialFileUrl("");
    setMaterialFileType("");
    setSelectedMaterial(null);
  };

  const renderLessonModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && setIsLessonModalOpen(false)}
    >
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={selectedLesson ? handleEditLesson : handleAddLesson}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={() => setIsLessonModalOpen(false)}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {selectedLesson ? "Cập nhật bài học" : "Thêm bài học"}
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
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Mô tả
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={lessonDescription}
              onChange={(e) => setLessonDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Thứ tự
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={lessonOrder}
              onChange={(e) => setLessonOrder(e.target.value)}
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
              onClick={() => setIsLessonModalOpen(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : selectedLesson ? "Lưu bài học" : "Thêm bài học"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const renderVideoModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && setIsVideoModalOpen(false)}
    >
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={selectedVideo ? handleEditVideo : handleAddVideo}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {selectedVideo ? "Cập nhật video" : "Thêm video"}
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
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Mô tả
            </label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              URL Video <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Thứ tự
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={videoOrder}
              onChange={(e) => setVideoOrder(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Thời lượng (phút)
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={videoDuration}
              onChange={(e) => setVideoDuration(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={videoIsPreview}
              onChange={(e) => setVideoIsPreview(e.target.checked)}
            />
            <label className="ml-2 text-sm font-medium text-gray-600">
              Cho phép xem trước
            </label>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
              onClick={() => setIsVideoModalOpen(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : selectedVideo ? "Lưu video" : "Thêm video"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  const renderMaterialModal = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && setIsMaterialModalOpen(false)}
    >
      <form
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform transition-all scale-100 hover:scale-[1.01]"
        onClick={(e) => e.stopPropagation()}
        onSubmit={selectedMaterial ? handleEditMaterial : handleAddMaterial}
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={() => setIsMaterialModalOpen(false)}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {selectedMaterial ? "Cập nhật tài liệu" : "Thêm tài liệu"}
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
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              URL File <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={materialFileUrl}
              onChange={(e) => setMaterialFileUrl(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 px-2 bg-white text-sm font-medium text-gray-600">
              Loại File <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800"
              value={materialFileType}
              onChange={(e) => setMaterialFileType(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
              onClick={() => setIsMaterialModalOpen(false)}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : selectedMaterial ? "Lưu tài liệu" : "Thêm tài liệu"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-md p-4 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative transform transition-all scale-100 hover:scale-[1.01] max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
          onClick={onClose}
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý bài học - {course.title}</h2>
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300"
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              onClick={() => {
                resetLessonForm();
                setIsLessonModalOpen(true);
              }}
              disabled={loading}
            >
              <Plus className="inline w-5 h-5 mr-2" /> Thêm bài học
            </button>
          </div>
        </div>
        <div className="w-full flex-grow p-6">
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
                    <th className="p-4 text-left text-sm font-semibold">Videos</th>
                    <th className="p-4 text-left text-sm font-semibold">Tài liệu</th>
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
                      <td className="p-4 text-[15px] text-gray-600 font-medium">
                        {lesson.description || "Không có mô tả"}
                      </td>
                      <td className="p-4 text-[15px] text-gray-600 font-medium">
                        {lesson.order_number ?? "N/A"}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <button
                            className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                            title="Thêm video"
                            onClick={() => {
                              setSelectedLesson(lesson);
                              resetVideoForm();
                              setIsVideoModalOpen(true);
                            }}
                            disabled={loading}
                          >
                            <MdVideoLibrary className="w-5 h-5 text-green-500" />
                            <span className="ml-1 text-green-500">Thêm</span>
                          </button>
                          {(lesson.videos || []).map((video) => (
                            <div key={video.id} className="flex items-center gap-2">
                              <span className="text-[14px] text-gray-600">{video.title}</span>
                              <button
                                className="p-1 rounded-full hover:bg-gray-200"
                                title="Chỉnh sửa video"
                                onClick={() => {
                                  setSelectedLesson(lesson);
                                  setSelectedVideo(video);
                                  setVideoTitle(video.title);
                                  setVideoDescription(video.description || "");
                                  setVideoUrl(video.video_url);
                                  setVideoOrder(video.order_number?.toString() || "");
                                  setVideoDuration(video.duration?.toString() || "");
                                  setVideoIsPreview(video.is_preview || false);
                                  setIsVideoModalOpen(true);
                                }}
                                disabled={loading}
                              >
                                <MdEdit className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                className="p-1 rounded-full hover:bg-gray-200"
                                title="Xóa video"
                                onClick={() => handleDeleteVideo(lesson.id, video.id)}
                                disabled={loading}
                              >
                                <MdDelete className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <button
                            className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                            title="Thêm tài liệu"
                            onClick={() => {
                              setSelectedLesson(lesson);
                              resetMaterialForm();
                              setIsMaterialModalOpen(true);
                            }}
                            disabled={loading}
                          >
                            <MdInsertDriveFile className="w-5 h-5 text-purple-500" />
                            <span className="ml-1 text-purple-500">Thêm</span>
                          </button>
                          {(lesson.materials || []).map((material) => (
                            <div key={material.id} className="flex items-center gap-2">
                              <span className="text-[14px] text-gray-600">{material.title}</span>
                              <button
                                className="p-1 rounded-full hover:bg-gray-200"
                                title="Chỉnh sửa tài liệu"
                                onClick={() => {
                                  setSelectedLesson(lesson);
                                  setSelectedMaterial(material);
                                  setMaterialTitle(material.title);
                                  setMaterialFileUrl(material.file_url);
                                  setMaterialFileType(material.file_type);
                                  setIsMaterialModalOpen(true);
                                }}
                                disabled={loading}
                              >
                                <MdEdit className="w-4 h-4 text-blue-500" />
                              </button>
                              <button
                                className="p-1 rounded-full hover:bg-gray-200"
                                title="Xóa tài liệu"
                                onClick={() => handleDeleteMaterial(lesson.id, material.id)}
                                disabled={loading}
                              >
                                <MdDelete className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="p-1.5 rounded-full hover:bg-gray-200 transition-all duration-200"
                            title="Chỉnh sửa"
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setLessonTitle(lesson.title);
                              setLessonDescription(lesson.description || "");
                              setLessonOrder(lesson.order_number?.toString() || "");
                              setIsLessonModalOpen(true);
                            }}
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
        </div>
        {isLessonModalOpen && renderLessonModal()}
        {isVideoModalOpen && renderVideoModal()}
        {isMaterialModalOpen && renderMaterialModal()}
      </div>
    </div>
  );
};

export default Lesson;