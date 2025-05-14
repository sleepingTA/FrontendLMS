import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Slider } from "./slider";
import { Button } from "./button";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

interface LectureProgress {
  _id: string;
  title: string;
  videoUrl: string;
  progressValue?: number;
}

interface VideoPlayerProps {
  width?: string | number;
  height?: string | number;
  url: string;
  onProgressUpdate: (data: LectureProgress) => void;
  progressData: LectureProgress;
}

function VideoPlayer({
  width = "100%",
  height = "100%",
  url,
  onProgressUpdate,
  progressData,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);

  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlayAndPause = () => setPlaying((prev) => !prev);

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleRewind = () => {
    const time = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(time - 5);
  };

  const handleForward = () => {
    const time = playerRef.current?.getCurrentTime() || 0;
    playerRef.current?.seekTo(time + 5);
  };

  const handleToggleMute = () => setMuted((prev) => !prev);

  const handleSeekChange = (newValue: number[]) => {
    setPlayed(newValue[0] / 100);
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current?.seekTo(played);
  };

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0] / 100);
  };

  const pad = (s: number | string) => ("0" + s).slice(-2);

  const formatTime = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());

    return hh ? `${hh}:${pad(mm)}:${ss}` : `${mm}:${ss}`;
  };

  const handleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      playerContainerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, [isFullScreen]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (played === 1) {
      onProgressUpdate({
        ...progressData,
        progressValue: played,
      });
    }
  }, [played]);

  return (
    <div
      ref={playerContainerRef}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
      ${isFullScreen ? "w-screen h-screen" : ""}
      `}
      style={{ width, height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
      />
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={handleSeekChange}
            onValueCommit={handleSeekMouseUp}
            className="w-full mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayAndPause}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                onClick={handleRewind}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleForward}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                <RotateCw className="h-6 w-6" />
              </Button>
              <Button
                onClick={handleToggleMute}
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
              >
                {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </Button>
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-white text-sm">
                {formatTime(played * (playerRef.current?.getDuration() || 0))}/{" "}
                {formatTime(playerRef.current?.getDuration() || 0)}
              </div>
              <Button
                className="text-white bg-transparent hover:text-white hover:bg-gray-700"
                variant="ghost"
                size="icon"
                onClick={handleFullScreen}
              >
                {isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
