"use client";

const videos = [
  {
    title: "Анимация 1",
    embedUrl: "https://kinescope.io/embed/aNz9iRBduttwMFUxgWgrWE",
  },
  {
    title: "Анимация 2",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
  },
  {
    title: "Анимация 3",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
  },
  {
    title: "Анимация 4",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_4",
  },
  {
    title: "Анимация 3",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID_5",
  },

];

export default function AnimationGallery() {
  return (
    <div className="animation-grid">
      {videos.map((video, index) => (
        <div key={index} className="animation-item">
          <div className="animation-video-wrapper">
            <iframe
              src={video.embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}