import React, { useState, useEffect } from "react";
import type { Video, Course } from "../types";
import VideoPlayer from "./VideoPlayer";
import { CheckCircleIconOutline, CheckCircleIconFilled } from "./icons";
import { useSearchParams } from "react-router-dom";

interface StudentPageProps {
    courses: Course[];
    completedVideoIds: Set<string>;
    toggleVideoCompletion: (id: string) => void;
}

const CoursePlayerView: React.FC<{
    course: Course;
    completedVideoIds: Set<string>;
    toggleVideoCompletion: (id: string) => void;
    onBack: () => void;
}> = ({ course, completedVideoIds, toggleVideoCompletion, onBack }) => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    useEffect(() => {
        if (course.videos.length > 0) {
            setSelectedVideo(course.videos[0]);
        } else {
            setSelectedVideo(null);
        }
    }, [course]);

    if (course.videos.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="bg-sky-600 text-white py-3 mb-6 shadow">
                    Welcome, <span className="font-bold">{name}</span>
                </div>
                <p>Your email: {email}</p>
                <p>This is your student dashboard.</p>
                <button
                    onClick={onBack}
                    className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                    &larr; Back to Courses
                </button>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    No Lessons in this Course
                </h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Content for "{course.title}" is coming soon.
                </p>
            </div>
        );
    }

    const courseVideos = course.videos;
    const completedInCourseCount = courseVideos.filter((v) =>
        completedVideoIds.has(v.id)
    ).length;
    const progress =
        courseVideos.length > 0
            ? (completedInCourseCount / courseVideos.length) * 100
            : 0;

    return (
        <div>
            <div className="bg-sky-600 text-white py-3 mb-6 shadow">
                Welcome, <span className="font-bold">{name}</span>
            </div>

            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
                &larr; Back to Courses
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                    <div className="bg-black rounded-lg shadow-2xl overflow-hidden aspect-video mb-4">
                        {selectedVideo && (
                            <VideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
                        )}
                    </div>
                    {selectedVideo && (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                                {selectedVideo.title}
                            </h1>
                            <p className="text-slate-600 dark:text-slate-300">
                                {selectedVideo.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                                {completedInCourseCount} / {courseVideos.length}
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-right text-slate-500 dark:text-slate-400 mt-1">
                            {Math.round(progress)}% Complete
                        </p>
                    </div>

                    {/* Video list */}
                    <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-2">
                        {courseVideos.map((video, index) => {
                            const isCompleted = completedVideoIds.has(video.id);
                            return (
                                <div
                                    key={video.id}
                                    className={`w-full flex items-center justify-between rounded-md transition-all duration-200 ${selectedVideo?.id === video.id
                                            ? "bg-sky-100 dark:bg-sky-900/50 ring-2 ring-sky-500"
                                            : "bg-white dark:bg-slate-800 shadow-sm"
                                        }`}
                                >
                                    <button
                                        onClick={() => setSelectedVideo(video)}
                                        className={`flex-grow text-left p-3 rounded-l-md transition-all duration-200 ${isCompleted ? "opacity-70" : "opacity-100"
                                            } hover:bg-slate-100 dark:hover:bg-slate-700`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <span
                                                className={`text-lg font-bold ${selectedVideo?.id === video.id
                                                        ? "text-sky-600 dark:text-sky-400"
                                                        : "text-slate-500 dark:text-slate-400"
                                                    }`}
                                            >
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p
                                                    className={`font-semibold ${selectedVideo?.id === video.id
                                                            ? "text-slate-800 dark:text-slate-100"
                                                            : "text-slate-700 dark:text-slate-200"
                                                        } ${isCompleted ? "line-through" : ""}`}
                                                >
                                                    {video.title}
                                                </p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    Video
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => toggleVideoCompletion(video.id)}
                                        aria-label={
                                            isCompleted
                                                ? "Mark as incomplete"
                                                : "Mark as complete"
                                        }
                                        className="p-3 pr-4 rounded-r-md transition-colors duration-200 text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 focus:outline-none"
                                    >
                                        {isCompleted ? (
                                            <CheckCircleIconFilled />
                                        ) : (
                                            <CheckCircleIconOutline />
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudentPage: React.FC<StudentPageProps> = ({
    courses,
    completedVideoIds,
    toggleVideoCompletion,
}) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [searchParams] = useSearchParams();
    const queryName = searchParams.get("name");
    const queryEmail = searchParams.get("email");

    const [user, setUser] = React.useState<{ name?: string; email?: string }>({
        name: queryName || "",
        email: queryEmail || "",
    });

    useEffect(() => {
        if (queryName && queryEmail) {
            localStorage.setItem(
                "user",
                JSON.stringify({ name: queryName, email: queryEmail })
            );
        } else {
            const stored = localStorage.getItem("user");
            if (stored) setUser(JSON.parse(stored));
        }
    }, [queryName, queryEmail]);

    if (selectedCourse) {
        return (
            <CoursePlayerView
                course={selectedCourse}
                completedVideoIds={completedVideoIds}
                toggleVideoCompletion={toggleVideoCompletion}
                onBack={() => setSelectedCourse(null)}
            />
        );
    }

    return (
        <div>
            {/* ✅ Add header at top */}
            <div className="bg-sky-600 text-white py-3 mb-6 shadow">
                Welcome, <span className="font-bold">{user.name}</span>
            </div>

            <h1 className="text-4xl font-extrabold text-center mb-2 text-slate-900 dark:text-white">
                Available Courses
            </h1>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-10">
                Select a course to begin your learning journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => {
                    const courseVideos = course.videos;
                    const completedInCourseCount = courseVideos.filter((v) =>
                        completedVideoIds.has(v.id)
                    ).length;
                    const progress =
                        courseVideos.length > 0
                            ? (completedInCourseCount / courseVideos.length) * 100
                            : 0;

                    return (
                        <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {course.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-4">
                                    {course.videos.length} lessons
                                </p>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        Progress
                                    </span>
                                    <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                                        {completedInCourseCount} / {courseVideos.length}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-sky-500 h-2 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentPage;
