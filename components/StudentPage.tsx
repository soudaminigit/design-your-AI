
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export interface Lesson { id: string; title: string; url: string; description?: string; completed?: boolean; }
export interface Course { id: string; title: string; lessons: Lesson[]; }

const StudentPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    useEffect(() => {
        const sample: Course = {
            id: "c1",
            title: "Sample Course",
            lessons: [
                { id: "l1", title: "Lesson 1", url: "https://drive.google.com/file/d/16Z0w-SneqbVCxYQa2i3fwjqGp3aKkuLc/view?usp=drive_link" }
            ]
        };
        setCourses([sample]);
        setSelectedCourse(sample);
        setSelectedLesson(sample.lessons[0]);
    }, []);

    if (!selectedCourse || !selectedLesson) return <div>Loading...</div>;

    return (
        <div style={{ padding: 20 }}>
            <h1>{selectedCourse.title}</h1>
            <h2>{selectedLesson.title}</h2>
            <div style={{ width: "800px", height: "450px" }}>
                <VideoPlayer url={selectedLesson.url} title={selectedLesson.title} />
            </div>
        </div>
    );
};

export default StudentPage;
