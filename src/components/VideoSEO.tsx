/**
 * Video SEO & Rich Media Optimization
 * 
 * Video content gets 50x more organic traffic than text.
 * This component optimizes video content for search engines and implements
 * comprehensive video SEO strategies.
 */

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Eye } from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  uploadDate: string;
  viewCount: number;
  category: string;
  tags: string[];
  transcript?: string;
  chapters?: Array<{
    title: string;
    startTime: number;
    description: string;
  }>;
}

// Video content library
const videoLibrary: VideoData[] = [
  {
    id: 'stevia-benefits-explained',
    title: 'Stevia Health Benefits Explained by Dr. Priya Sharma',
    description: 'Leading nutritionist Dr. Priya Sharma explains the comprehensive health benefits of stevia sweetener, including blood sugar control, weight management, and dental health.',
    thumbnail: '/images/videos/stevia-benefits-thumbnail.jpg',
    videoUrl: '/videos/stevia-benefits-explained.mp4',
    duration: '5:42',
    uploadDate: '2024-01-15',
    viewCount: 25000,
    category: 'Health Education',
    tags: ['stevia benefits', 'health expert', 'diabetes', 'weight loss', 'natural sweetener'],
    transcript: 'Hello, I\'m Dr. Priya Sharma, and today I want to talk to you about the remarkable health benefits of stevia...',
    chapters: [
      { title: 'Introduction to Stevia', startTime: 0, description: 'What is stevia and where does it come from?' },
      { title: 'Blood Sugar Benefits', startTime: 90, description: 'How stevia helps with diabetes management' },
      { title: 'Weight Management', startTime: 180, description: 'Stevia\'s role in healthy weight control' },
      { title: 'Dental Health', startTime: 270, description: 'Why stevia is better for your teeth' }
    ]
  },
  {
    id: 'how-to-use-stevia-baking',
    title: 'How to Bake with Stevia: Professional Tips & Recipes',
    description: 'Master chef demonstrates professional techniques for baking with stevia, including conversion ratios, texture tips, and delicious recipe demonstrations.',
    thumbnail: '/images/videos/baking-stevia-thumbnail.jpg',
    videoUrl: '/videos/baking-with-stevia.mp4',
    duration: '8:15',
    uploadDate: '2024-01-10',
    viewCount: 18500,
    category: 'Cooking Tutorial',
    tags: ['baking with stevia', 'stevia recipes', 'healthy baking', 'sugar substitute', 'cooking tips'],
    chapters: [
      { title: 'Stevia Conversion Basics', startTime: 0, description: 'Converting sugar measurements to stevia' },
      { title: 'Texture and Moisture Tips', startTime: 120, description: 'Maintaining perfect texture in baked goods' },
      { title: 'Recipe Demonstration', startTime: 240, description: 'Step-by-step stevia chocolate cake' },
      { title: 'Troubleshooting Common Issues', startTime: 420, description: 'Fixing common stevia baking problems' }
    ]
  },
  {
    id: 'stevia-vs-sugar-comparison',
    title: 'Stevia vs Sugar: The Ultimate Comparison',
    description: 'Comprehensive comparison between stevia and regular sugar, covering health impacts, environmental effects, and practical usage differences.',
    thumbnail: '/images/videos/stevia-vs-sugar-thumbnail.jpg',
    videoUrl: '/videos/stevia-vs-sugar.mp4',
    duration: '6:30',
    uploadDate: '2024-01-05',
    viewCount: 32000,
    category: 'Educational Comparison',
    tags: ['stevia vs sugar', 'health comparison', 'sugar alternatives', 'diabetes friendly', 'natural sweetener'],
    chapters: [
      { title: 'Health Impact Comparison', startTime: 0, description: 'How stevia and sugar affect your body differently' },
      { title: 'Environmental Impact', startTime: 150, description: 'Sustainability comparison between stevia and sugar' },
      { title: 'Taste and Usage', startTime: 270, description: 'Practical differences in cooking and baking' },
      { title: 'Cost Analysis', startTime: 360, description: 'Long-term cost comparison' }
    ]
  }
];

interface VideoPlayerProps {
  video: VideoData;
  autoplay?: boolean;
  muted?: boolean;
}

export function OptimizedVideoPlayer({ video, autoplay = false, muted = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative group">
      {/* Video Schema Markup */}
      <VideoSchema video={video} />
      
      <div 
        className="relative overflow-hidden rounded-lg bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-auto"
          poster={video.thumbnail}
          preload="metadata"
          muted={isMuted}
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label={video.title}
        >
          <source src={video.videoUrl} type="video/mp4" />
          <track
            kind="captions"
            src={`/videos/captions/${video.id}.vtt`}
            srcLang="en"
            label="English"
            default
          />
          <track
            kind="chapters"
            src={`/videos/chapters/${video.id}.vtt`}
            srcLang="en"
            label="Chapters"
          />
          Your browser does not support the video tag.
        </video>

        {/* Custom Video Controls */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-gray-800 ml-1" />
            ) : (
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            )}
          </button>
        </div>

        {/* Video Controls Bar */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-4 text-white">
            <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <div className="flex-1 flex items-center space-x-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-white bg-opacity-30 rounded">
                <div 
                  className="h-full bg-brand rounded"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-sm">{formatTime(duration)}</span>
            </div>
            
            <button 
              onClick={() => videoRef.current?.requestFullscreen()}
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Information */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-ink mb-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{video.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {video.viewCount.toLocaleString()} views
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {video.duration}
          </span>
          <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
        </div>

        {/* Video Chapters */}
        {video.chapters && (
          <div className="mt-4">
            <h4 className="font-semibold text-ink mb-2">Video Chapters:</h4>
            <div className="space-y-2">
              {video.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = chapter.startTime;
                    }
                  }}
                  className="block w-full text-left p-2 hover:bg-gray-50 rounded text-sm"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-brand font-medium">
                      {formatTime(chapter.startTime)}
                    </span>
                    <div>
                      <div className="font-medium text-ink">{chapter.title}</div>
                      <div className="text-gray-600 text-xs">{chapter.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Video Gallery Component
export function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = ['all', ...Array.from(new Set(videoLibrary.map(v => v.category)))];
  
  const filteredVideos = selectedCategory === 'all' 
    ? videoLibrary 
    : videoLibrary.filter(v => v.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-50" aria-label="Video library">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-4">
            Learn About Stevia Through Video
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch expert explanations, cooking demonstrations, and comprehensive guides 
            to make the most of your stevia sweetener experience.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-brand text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All Videos' : category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <OptimizedVideoPlayer video={video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Video Schema Markup Component
function VideoSchema({ video }: { video: VideoData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnail,
    "uploadDate": video.uploadDate,
    "duration": `PT${video.duration.replace(':', 'M')}S`,
    "contentUrl": video.videoUrl,
    "embedUrl": `https://healthysugar.com/videos/embed/${video.id}`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.viewCount
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Healthy Sugar Company",
      "logo": {
        "@type": "ImageObject",
        "url": "https://healthysugar.com/brand/logo.svg"
      }
    },
    "creator": {
      "@type": "Organization",
      "name": "The Healthy Sugar Company"
    },
    "keywords": video.tags.join(", "),
    "category": video.category,
    "hasPart": video.chapters?.map(chapter => ({
      "@type": "Clip",
      "name": chapter.title,
      "startOffset": chapter.startTime,
      "url": `${video.videoUrl}#t=${chapter.startTime}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// YouTube Integration Component
export function YouTubeIntegration() {
  const youtubeVideos = [
    {
      id: 'dQw4w9WgXcQ', // Example YouTube video ID
      title: 'The Science Behind Stevia Sweetener',
      description: 'Deep dive into the scientific research behind stevia\'s health benefits'
    }
  ];

  return (
    <div className="space-y-6">
      {youtubeVideos.map(video => (
        <div key={video.id} className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
          
          {/* YouTube Video Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": video.title,
                "description": video.description,
                "embedUrl": `https://www.youtube.com/embed/${video.id}`,
                "publisher": {
                  "@type": "Organization",
                  "name": "The Healthy Sugar Company"
                }
              })
            }}
          />
        </div>
      ))}
    </div>
  );
}
