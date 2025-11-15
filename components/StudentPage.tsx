// src/components/StudentPage.tsx
import React, { 
  useEffect, 
  useState, 
  Suspense, 
  useCallback, 
  ReactElement 
} from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

// Import the JSON data with type assertion
import rawCoursesData from "../Scripts/src/data/courses.json";

// Types
// Types
export interface Lesson {
  id: string;
  title: string;
  description?: string;
  url: string;
  duration?: number;
  thumbnail?: string;
  notebook?: boolean;
  completed?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  lessons: Lesson[];
  videos?: Lesson[]; // For backward compatibility
  name?: string; // Alternative to title for backward compatibility
  level?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface StudentPageProps {
  initialCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
  onLessonSelect?: (lessonId: string) => void;
  onLessonComplete?: (lessonId: string, completed: boolean) => void;
  className?: string;
}

// Type for the raw course data from JSON
interface RawCourse {
  id?: string;
  title?: string;
  name?: string;
  description?: string;
  thumbnail?: string;
  lessons?: Array<{
    id?: string;
    title?: string;
    description?: string;
    url?: string;
    duration?: number;
    thumbnail?: string;
    notebook?: boolean;
    completed?: boolean;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
  }>;
  videos?: any[];
  level?: string;
  category?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Type assertion for the imported JSON
const coursesJson = rawCoursesData as unknown as RawCourse[];

// Define props for the fallback player component
interface FallbackPlayerProps {
  url: string;
  [key: string]: any;
}

// Fallback component for when ReactPlayer fails to load
const FallbackPlayer: React.FC<FallbackPlayerProps> = ({ url }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <p className="text-red-500">Failed to load video player.</p>
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-500 underline mt-2 inline-block"
    >
      Open video in new tab
    </a>
  </div>
);

// Safe wrapper for ReactPlayer with error boundary
// Define the type for the ReactPlayer component
interface ReactPlayerProps {
  url: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  controls?: boolean;
  config?: {
    file?: {
      attributes?: {
        controlsList?: string;
        disablePictureInPicture?: boolean;
      };
    };
  };
  onError?: (error: Error) => void;
  onReady?: () => void;
}

// Custom VideoPlayer component using native HTML5 video
interface VideoPlayerProps {
  url: string;
  style?: React.CSSProperties;
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  style,
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  onError,
  onPlay,
  onPause,
  onEnded,
  ...props
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  return (
    <div 
      className={`video-container ${className}`}
      style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        ...style
      }}
    >
      <video
        ref={videoRef}
        src={url}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
        }}
        {...props}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Safe wrapper for VideoPlayer with error boundary
const SafeVideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return (
    <ErrorBoundary fallback={<FallbackPlayer url={props.url} />}>
      <Suspense fallback={<PlayerFallback />}>
        <VideoPlayer {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Fallback component for loading
const PlayerFallback = () => (
  <div className="bg-gray-100 rounded-lg flex items-center justify-center" style={{ height: '480px' }}>
    <div className="animate-pulse text-gray-500">Loading player...</div>
  </div>
);

// Transform the imported JSON to match the Course[] shape
const rawCourses: Course[] = coursesJson.map((course, index) => ({
  id: course.id || `course-${index + 1}`,
  title: course.title || course.name || `Course ${index + 1}`,
  description: course.description,
  thumbnail: course.thumbnail,
  lessons: (course.lessons || course.videos || []).map((lesson: any, lessonIndex: number) => ({
    id: lesson.id || `lesson-${index}-${lessonIndex}`,
    title: lesson.title || `Lesson ${lessonIndex + 1}`,
    description: lesson.description,
    url: lesson.url || '',
    duration: lesson.duration,
    thumbnail: lesson.thumbnail,
    notebook: lesson.notebook,
    completed: lesson.completed || false,
    order: lesson.order || lessonIndex,
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt
  })),
  level: course.level as 'beginner' | 'intermediate' | 'advanced' | undefined,
  category: course.category,
  published: course.published,
  createdAt: course.createdAt,
  updatedAt: course.updatedAt
}));

interface Props {
    // If your app passes props, you can adapt; else leave empty and use rawCourses
}

const StudentPage: React.FC<StudentPageProps> = ({
  initialCourseId,
  onCourseSelect,
  onLessonSelect,
  onLessonComplete,
  className = ''
}): ReactElement => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");

    useEffect(() => {
        // Normalize data: some exports may use 'videos' key; convert to 'lessons'
        const normalized = rawCourses.map((c, i) => {
            const lessons = (c.lessons && c.lessons.length ? c.lessons : (c.videos || [])) as Lesson[];
            return {
                ...c,
                id: c.id || `course-${i + 1}`,
                title: c.title || c.name || c.id || `Course ${i + 1}`,
                lessons,
            };
        });

        setCourses(normalized);

        if (normalized.length > 0) {
            setSelectedCourse(normalized[0]);
            const firstLesson = normalized[0].lessons && normalized[0].lessons.length ? normalized[0].lessons[0] : null;
            setSelectedLesson(firstLesson);
        }
    }, []);

    const toggleVideoCompletion = useCallback((id: string) => {
        if (!selectedCourse || !selectedLesson) return;
        
        setCourses(prevCourses => 
            prevCourses.map(course => {
                if (course.id === selectedCourse.id) {
                    const updatedLessons = course.lessons.map(lesson => 
                        lesson.id === id || lesson.title === selectedLesson.title
                            ? { ...lesson, completed: !lesson.completed }
                            : lesson
                    );
                    return { ...course, lessons: updatedLessons };
                }
                return course;
            })
        );
        
        // Update the selected lesson's completed status
        const newCompletedStatus = !selectedLesson.completed;
        setSelectedLesson({ ...selectedLesson, completed: newCompletedStatus });
        
        // Notify parent component if callback is provided
        if (onLessonComplete && selectedLesson.id) {
            onLessonComplete(selectedLesson.id, newCompletedStatus);
        }
    }, [selectedCourse, selectedLesson, onLessonComplete]);
    
    // Ensure we have a valid return value
    if (!selectedCourse) {
        return <div>Loading courses...</div>;
    }

    return (
        <div 
            className={`relative min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-purple-100 font-[Inter] overflow-hidden p-6 ${className}`}
            role="main"
            aria-label="Course player"
        >
            <ErrorBoundary 
                fallback={
                    <div className="p-6 max-w-4xl mx-auto">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
                        <p className="mb-4">We're having trouble loading the course content. Please try refreshing the page or contact support if the issue persists.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Refresh Page
                        </button>
                    </div>
                }
            >
            <header className="z-10 w-full bg-gradient-to-r from-cyan-400 to-indigo-900 px-6 py-3 shadow-md flex justify-between items-center rounded-lg mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-indigo-700 to-purple-400 rounded-xl flex items-center justify-center text-2xl">🤖</div>
                    <h1 className="text-lg font-semibold text-white">Design Your AI</h1>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white text-sm backdrop-blur">
                    <span role="img" aria-label="user">👤</span>
                    {name ? `Hi, ${name}` : "Explorer Mode"}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Courses column */}
                <div className="lg:col-span-1 bg-white/90 p-4 rounded-2xl shadow-lg max-h-[70vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-indigo-900 mb-4">Courses</h2>
                    <div className="space-y-3">
                        {courses.map((c) => {
                            const totalLessons = c.lessons?.length || 0;
                            const completedCount = c.lessons?.filter(l => l.completed).length || 0;
                            const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
                            return (
                                <div key={c.id} className={`p-3 rounded-xl cursor-pointer hover:shadow-md transition ${selectedCourse?.id === c.id ? "ring-2 ring-indigo-300" : "bg-white"}`} onClick={() => { setSelectedCourse(c); setSelectedLesson(c.lessons && c.lessons.length ? c.lessons[0] : null); }}>
                                    <h3 className="text-lg font-semibold text-indigo-900">{c.title}</h3>
                                    <p className="text-sm text-slate-500">{c.description}</p>
                                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                                        <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{progress}% complete</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Player and lessons */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/90 p-6 rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-indigo-900">{selectedCourse?.title || "Select a course"}</h2>
                        <p className="text-slate-600">{selectedCourse?.description}</p>
                    </div>

                    <div className="bg-white/90 p-6 rounded-2xl shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                {selectedLesson ? (
                                    <>
                                        <h3 className="text-xl font-semibold text-indigo-900 mb-3">{selectedLesson.title}</h3>
                                        <div className="rounded-lg overflow-hidden">
                                            <ErrorBoundary 
                                                fallback={
                                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                        <p className="text-red-700">Unable to load the video player.</p>
                                                        <a 
                                                            href={selectedLesson.url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline mt-2 inline-block"
                                                        >
                                                            Open video in new tab
                                                        </a>
                                                    </div>
                                                }
                                            >
                                                <Suspense fallback={<PlayerFallback />}>
                                                    <ErrorBoundary 
                                                        fallback={
                                                            <div className="p-4 bg-red-50 rounded-lg">
                                                                <p className="text-red-700">Unable to load the video player.</p>
                                                                <a 
                                                                    href={selectedLesson?.url} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline mt-2 inline-block"
                                                                >
                                                                    Open video in new tab
                                                                </a>
                                                            </div>
                                                        }
                                                    >
                                                        <div className="relative w-full bg-black rounded-lg overflow-hidden">
                                                            {selectedLesson && (
                                                                <SafeVideoPlayer 
                                                                    url={selectedLesson.url}
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                    onError={(e) => {
                                                                        console.error('Error loading video:', e);
                                                                    }}
                                                                    onPlay={() => {
                                                                        // Set focus to the player when it starts playing
                                                                        const video = document.querySelector('video');
                                                                        if (video) {
                                                                            video.focus();
                                                                        }
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </ErrorBoundary>
                                                </Suspense>
                                            </ErrorBoundary>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="text-sm text-slate-600">{selectedLesson.description}</div>
                                            <button 
                                                onClick={() => selectedLesson && selectedLesson.id && toggleVideoCompletion(selectedLesson.id)} 
                                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                aria-label={selectedLesson.completed ? 'Mark as not completed' : 'Mark as completed'}
                                            >
                                                {selectedLesson.completed ? 'Completed ✓' : 'Mark Complete'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-slate-500 p-8">No lesson selected</div>
                                )}
                            </div>

                            <aside className="lg:col-span-1 p-2">
                                <h4 className="text-lg font-semibold mb-3">Lessons</h4>
                                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                                    {(selectedCourse?.lessons || []).map((l) => (
                                        <div 
                                            key={l.id || l.title}
                                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                                                selectedLesson?.title === l.title 
                                                    ? "bg-indigo-100 border-l-4 border-indigo-500" 
                                                    : "bg-white hover:bg-slate-50"
                                            } ${l.completed ? 'opacity-75' : ''}`} 
                                            onClick={() => setSelectedLesson(l)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-medium text-indigo-800">
                                                    {l.completed && <span className="text-green-500 mr-1">✓</span>}
                                                    {l.title}
                                                </div>
                                                <div className="text-xs text-slate-500">{l.notebook ? "Notebook available" : ""}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
            </ErrorBoundary>
        </div>
    );
};

export default React.memo(StudentPage);
