import React, { useRef, useEffect } from 'react';
import { Situation, getVideoUrl } from '../data/examData';

interface VideoPlayerProps {
  situation: Situation;
  showAnswerOverlay?: boolean;
  isExamMode?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ situation }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Resolves to https://mo-phong-giao-thong.github.io/videos/...
  const videoSrc = getVideoUrl(situation.video);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [situation.id, situation.video]);

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden border border-slate-700 shadow-md">
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          playsInline
          autoPlay
          className="w-full h-full object-contain bg-black"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>
    </div>
  );
};
