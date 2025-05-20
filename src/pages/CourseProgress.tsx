import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { ScrollArea } from "../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import VideoPlayer from "../components/ui/video-player";
import { getCourseDetails } from "../services/CourseService";
import { Lesson, Video, Material } from "../types/types";

interface CourseDetails {
  _id: string;
  title: string;
  description: string;
  curriculum: Lesson[];
}

function CourseProgress() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = Number(searchParams.get("courseId")) || 0;
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect called with courseId:', courseId);
    const fetchCourseData = async () => {
      try {
        if (!courseId) {
          setError('ID khóa học không hợp lệ');
          setLoading(false);
          return;
        }

        const courseData = await getCourseDetails(courseId);
        if (!courseData) {
          setError('Không tìm thấy khóa học');
          setLoading(false);
          return;
        }

        const curriculum = (courseData.lessons ?? []).map((lesson) => ({
          ...lesson,
          videos: lesson.videos || [],
          materials: lesson.materials || [],
        }));

        setCourse({
          _id: courseId.toString(),
          title: courseData.title || "Untitled Course",
          description: courseData.description || "No description available",
          curriculum,
        });

        setCurrentLesson(curriculum[0] || null);

        console.log('Course Data:', courseData);
        console.log('Curriculum:', curriculum);
        console.log('Current Lesson:', curriculum[0]);
        console.log('Current Video:', currentVideo);

        setLoading(false);
      } catch (err: any) {
        console.error('Lỗi khi lấy dữ liệu khóa học:', err);
        setError(err.response?.data?.message || 'Không thể tải khóa học');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setCurrentVideo(null); // Xóa video hiện tại khi chọn lesson mới
    setCurrentMaterial(null); // Xóa PDF hiện tại khi chọn lesson mới
  };

  const handleVideoClick = (video: Video) => {
    console.log('Video clicked:', video);
    setCurrentVideo(video);
    setCurrentMaterial(null); // Xóa PDF khi chọn video
  };

  const handleMaterialClick = (material: Material) => {
    console.log('Material clicked:', material);
    setCurrentMaterial(material);
    setCurrentVideo(null); // Xóa video khi chọn PDF
  };

  let content;
  if (loading) {
    content = <div className="text-center py-10">Đang tải...</div>;
  } else if (error || !course) {
    content = (
      <div className="text-center py-10 text-red-500">
        {error || `Không tìm thấy khóa học với ID ${courseId}`}
      </div>
    );
  } else {
    const videoUrl = currentVideo?.video_url ? `http://localhost:3000/${currentVideo.video_url}` : "";
    const materialUrl = currentMaterial?.file_url ? `http://localhost:3000/${currentMaterial.file_url}` : "";
    console.log('VideoPlayer URL:', videoUrl);
    console.log('Material URL:', materialUrl);

    content = (
      <div className="flex flex-col min-h-screen bg-[#1c1d1f] text-white">
        <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/mycourses")}
              className="text-black bg-white"
              variant="ghost"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to My Courses Page
            </Button>
            <div className="text-lg font-bold hidden md:block">{course.title}</div>
          </div>
          <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            {isSideBarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex flex-1">
          {/* Danh sách lesson, video, PDF (bên trái) */}
          <div
            className={`fixed top-[64px] left-0 bottom-0 w-[400px] bg-[#1c1d1f] border-r border-gray-700 transition-all duration-300 ${
              isSideBarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Tabs defaultValue="content" className="h-full flex flex-col">
              <TabsList className="grid bg-white w-full grid-cols-2 p-0 h-14">
                <TabsTrigger
                  value="content"
                  className="text-black rounded-none h-full hover:bg-gray-100 hover:rounded cursor-pointer"
                >
                  Course Content
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="text-black rounded-none h-full hover:bg-gray-100 hover:rounded cursor-pointer"
                >
                  Overview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {course.curriculum.length > 0 ? (
                      course.curriculum.map((lesson) => (
                        <div key={lesson.id} className="cursor-pointer" onClick={() => handleLessonClick(lesson)}>
                          <div className="flex items-center space-x-2 text-sm text-white font-bold">
                            <Play className="h-4 w-4" />
                            <span>{lesson.title}</span>
                          </div>
                          {lesson.videos.length > 0 && (
                            <div className="ml-6 mt-2 space-y-2">
                              {lesson.videos.map((video) => (
                                <div
                                  key={video.id}
                                  className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVideoClick(video);
                                  }}
                                >
                                  <Play className="h-4 w-4" />
                                  <span>{video.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {lesson.materials.length > 0 && (
                            <div className="ml-6 mt-2 space-y-2">
                              {lesson.materials.map((material) => (
                                <div
                                  key={material.id}
                                  className="flex items-center space-x-2 text-sm text-blue-400 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMaterialClick(material);
                                  }}
                                >
                                  <span>{material.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center">Không có bài học nào.</p>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="overview" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">About this course</h2>
                    <p className="text-gray-400">{course.description}</p>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
          {/* Khung cố định bên phải: Hiển thị video hoặc PDF */}
          <div className={`flex-1 ${isSideBarOpen ? "ml-[400px]" : ""} transition-all duration-300`}>
            <div className="p-6 bg-[#1c1d1f] text-white">
              <div className="text-2xl font-bold">{currentLesson?.title || "Không có bài học được chọn"}</div>
              {currentVideo ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Video: {currentVideo.title}</h3>
                  <VideoPlayer
                    width="100%"
                    height="500px"
                    url={videoUrl}
                  />
                </div>
              ) : currentMaterial ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Tài liệu: {currentMaterial.title}</h3>
                  <div className="relative w-full" style={{ height: '600px' }}>
                    <iframe
                      src={materialUrl}
                      width="100%"
                      height="100%"
                      className="border-none"
                      title={currentMaterial.title}
                      scrolling="auto"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 mt-2">Vui lòng chọn video hoặc tài liệu để xem.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}

export default CourseProgress;