import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
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
import { Check, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/ui/video-player";

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  progressValue?: number;
}

interface CourseDetails {
  _id: string;
  title: string;
  description: string;
  curriculum: Lecture[];
}

const mockCourse: CourseDetails = {
  _id: "course123",
  title: "React for Beginners",
  description: "Learn the fundamentals of React.js in this beginner course.",
  curriculum: [
    {
      _id: "lec1",
      title: "Introduction to React",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      _id: "lec2",
      title: "JSX & Components",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      _id: "lec3",
      title: "State and Props",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ],
};

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(
    mockCourse.curriculum[0]
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);

  const handleLectureClick = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    if (!completedLectures.includes(lecture._id)) {
      setCompletedLectures([...completedLectures, lecture._id]);
    }
  };

  const handleRewatchCourse = () => {
    setCompletedLectures([]);
    setShowCourseCompleteDialog(false);
    setShowConfetti(false);
    setCurrentLecture(mockCourse.curriculum[0]);
  };

  useEffect(() => {
    if (completedLectures.length === mockCourse.curriculum.length) {
      setShowCourseCompleteDialog(true);
      setShowConfetti(true);
    }
  }, [completedLectures]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showConfetti && <Confetti />}
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
          <div className="text-lg font-bold hidden md:block">
            {mockCourse.title}
          </div>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${isSideBarOpen ? "mr-[400px]" : ""
            } transition-all duration-300`}
        >
          <VideoPlayer
            width="100%"
            height="500px"
            url={currentLecture?.videoUrl ?? ""}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture ?? mockCourse.curriculum[0]}
          />
          <div className="p-6 bg-[#1c1d1f] text-white">
            <div className="text-2xl font-bold">
              {currentLecture?.title}
            </div>
          </div>
        </div>

        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${isSideBarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-white w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className=" text-black rounded-none h-full hover:bg-gray-100 hover:rounded cursor-pointer"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className=" text-black rounded-none h-full hover:bg-gray-100 hover:rounded cursor-pointer"
              >
                Overview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {mockCourse.curriculum.map((lecture) => (
                    <div
                      key={lecture._id}
                      onClick={() => handleLectureClick(lecture)}
                      className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                    >
                      {completedLectures.includes(lecture._id) ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      <span>{lecture.title}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About this course</h2>
                  <p className="text-gray-400">{mockCourse.description}</p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showCourseCompleteDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You have completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/mycourses")}>
                  My Courses Page
                </Button>
                <Button onClick={handleRewatchCourse}>Rewatch Course</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;
