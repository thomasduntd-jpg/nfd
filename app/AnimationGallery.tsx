"use client";

const videos = [
  {
    title: "Анимация 1",
    embedUrl: "https://kinescope.io/embed/aNz9iRBduttwMFUxgWgrWE",
  },
  {
    title: "Анимация 2",
    embedUrl: "https://kinescope.io/embed/rQ9zVUKSurT37Ztn7HKmWU",
  },
  {
    title: "Анимация 3",
    embedUrl: "https://kinescope.io/embed/ojoXCfbfRykcX1GJHHWWRK",
  },
  {
    title: "Анимация 4",
    embedUrl: "https://kinescope.io/embed/rbgYLRacaFtB7EYCpC1bqA",
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