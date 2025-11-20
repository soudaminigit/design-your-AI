import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer"; // your ReactPlayer component
import rawCoursesData from "../Scripts/src/data/courses.json"; // adjust path if needed

// types
export interface Lesson {
    id: string;
    title: string;
    video?: string;
    notebook?: string;
    assessment?: string;
    completed?: boolean;
}
export interface Course {
    id: string;
    title: string;
    description?: string;
    category?: string;
    lessons: Lesson[];
}

const normalizeCourses = (raw: any[]): Course[] => {
    return raw.map((c, ci) => {
        const lessons = (c.lessons || []).map((l: any, li: number) => ({
            id: l.id ?? `${ci + 1}-${li + 1}`,
            title: l.title ?? `Lesson ${li + 1}`,
            video: l.video ?? "",
            notebook: l.notebook ?? "",
            assessment: l.assessment ?? "",
            completed: !!l.completed,
        }));
        return {
            id: c.id ?? String(ci + 1),
            title: c.title ?? c.name ?? `Course ${ci + 1}`,
            description: c.description ?? "",
            category: c.category ?? "",
            lessons,
        } as Course;
    });
};

const StudentPage: React.FC = () => {
    // import the JSON directly (works with "resolveJsonModule" in tsconfig)
    const raw: any[] = rawCoursesData as any[];
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseIdx, setSelectedCourseIdx] = useState<number>(0);
    const [selectedLessonIdx, setSelectedLessonIdx] = useState<number | null>(null);

    useEffect(() => {
        const normalized = normalizeCourses(raw);
        setCourses(normalized);

        // pick first course with at least one video-containing lesson
        let cIdx = 0;
        let lIdx: number | null = null;
        for (let i = 0; i < normalized.length; i++) {
            const hasVideoIdx = normalized[i].lessons.findIndex((x) => x.video && x.video.trim());
            if (hasVideoIdx >= 0) {
                cIdx = i;
                lIdx = hasVideoIdx;
                break;
            }
        }
        setSelectedCourseIdx(cIdx);
        setSelectedLessonIdx(lIdx);
    }, []);

    const selectCourse = (index: number) => {
        setSelectedCourseIdx(index);
        const course = courses[index];
        const hasVideoIdx = course.lessons.findIndex((x) => x.video && x.video.trim());
        setSelectedLessonIdx(hasVideoIdx >= 0 ? hasVideoIdx : null);
    };

    const selectLesson = (index: number) => {
        const lesson = courses[selectedCourseIdx].lessons[index];
        if (!lesson || !lesson.video || !lesson.video.trim()) {
            // ignore selection if no video
            setSelectedLessonIdx(null);
            return;
        }
        setSelectedLessonIdx(index);
    };

    const selectedCourse = courses[selectedCourseIdx];
    const selectedLesson = selectedCourse && selectedLessonIdx !== null ? selectedCourse.lessons[selectedLessonIdx] : null;

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-4 rounded shadow max-h-[70vh] overflow-y-auto">
                    <h2 className="text-lg font-bold mb-3">Courses</h2>
                    <div className="space-y-2">
                        {courses.map((c, i) => (
                            <button
                                key={c.id}
                                onClick={() => selectCourse(i)}
                                className={`block text-left w-full p-3 rounded ${i === selectedCourseIdx ? "bg-indigo-100" : "hover:bg-slate-50"}`}
                            >
                                <div className="font-semibold">{c.title}</div>
                                <div className="text-xs text-slate-500">{c.lessons.length} lessons</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-bold">{selectedCourse?.title ?? "Select a course"}</h2>
                        <p className="text-sm text-slate-600">{selectedCourse?.description}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            {selectedLesson ? (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{selectedLesson.title}</h3>
                                    <div className="w-full" style={{ minHeight: 360 }}>
                                        {/* VideoPlayer expects a playable URL (mp4 or supported provider). */}
                                        <VideoPlayer url={selectedLesson.video!} title={selectedLesson.title} />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-8 text-slate-500">No playble lesson selected</div>
                            )}
                        </div>

                        <aside className="lg:col-span-1">
                            <h4 className="font-semibold mb-2">Lessons</h4>
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                                {selectedCourse?.lessons.map((l, li) => (
                                    <div
                                        key={l.id}
                                        onClick={() => selectLesson(li)}
                                        className={`p-2 rounded cursor-pointer ${selectedLessonIdx === li ? "bg-indigo-50 border-l-4 border-indigo-500" : "hover:bg-slate-50"}`}
                                    >
                                        <div className="font-medium">{l.title}</div>
                                        <div className="text-xs text-slate-500">{l.video ? "Has video" : "No video"}</div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
