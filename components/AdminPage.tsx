import React, { useState, ChangeEvent, FormEvent } from 'react';
import type { Course, Lesson } from '../types';
import { TrashIcon } from './icons';

interface AdminPageProps {
  courses: Course[];
  addCourse: (title: string) => void;
  deleteCourse: (id: string) => void;
  addLesson: (courseId: string, title: string, description: string, file: File) => Promise<void>;
  deleteLesson: (courseId: string, lessonId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
  courses,
  addCourse,
  deleteCourse,
  addLesson,
  deleteLesson,
}) => {
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDescription, setNewLessonDescription] = useState('');
  const [newLessonFiles, setNewLessonFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAddCourse = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCourseTitle.trim()) {
      addCourse(newCourseTitle.trim());
      setNewCourseTitle('');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewLessonFiles(Array.from(e.target.files));
    } else {
      setNewLessonFiles([]);
    }
  };

  const handleAddLesson = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourseId || newLessonFiles.length === 0) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      for (const file of newLessonFiles) {
        // Use filename as title if title field is empty or if uploading multiple files
        const title = newLessonFiles.length > 1 
          ? file.name.replace(/\.[^/.]+$/, "") 
          : newLessonTitle.trim() || file.name.replace(/\.[^/.]+$/, "");
          
        await addLesson(
          selectedCourseId, 
          title, 
          newLessonDescription.trim(), 
          file
        );
      }
      
      // Reset form
      setNewLessonTitle('');
      setNewLessonDescription('');
      setNewLessonFiles([]);
      
      const fileInput = document.getElementById('lesson-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err) {
      console.error('Error adding lesson:', err);
      setError('Failed to upload one or more lessons. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const selectedCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) : null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-slate-900 dark:text-white">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Course Management */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Courses</h2>
          <form onSubmit={handleAddCourse} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
              placeholder="New course title"
              className="flex-grow bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
            />
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50" disabled={!newCourseTitle.trim()}>
              Add
            </button>
          </form>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {courses.map(course => (
              <div key={course.id} className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${selectedCourseId === course.id ? 'bg-sky-100 dark:bg-sky-900/50' : ''}`}>
                <button onClick={() => setSelectedCourseId(course.id)} className="text-left flex-grow">
                  <span className="font-semibold">{course.title}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">({course.lessons.length} lessons)</span>
                </button>
                <button onClick={() => deleteCourse(course.id)} className="text-red-500 hover:text-red-700 p-1">
                  <TrashIcon />
                </button>
              </div>
            ))}
             {courses.length === 0 && <p className="text-center text-slate-500 dark:text-slate-400 py-4">No courses yet. Add one above.</p>}
          </div>
        </div>

        {/* Lesson Management */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          {selectedCourse ? (
            <div>
              <h3 className="text-xl font-semibold mb-3">Add lesson(s) to <span className="text-sky-500">{selectedCourse.title}</span></h3>
              <form onSubmit={handleAddLesson} className="space-y-4">
                <input
                  type="text"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  placeholder="Lesson title (optional for multiple files)"
                  className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
                />
                <textarea
                  value={newLessonDescription}
                  onChange={(e) => setNewLessonDescription(e.target.value)}
                  placeholder="Lesson description (applies to all)"
                  rows={3}
                  className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
                />
                <input
                  id="lesson-upload"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileChange}
                  required
                  className="w-full text-sm text-slate-500 dark:text-slate-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-sky-50 file:text-sky-700
                    dark:file:bg-sky-900/50 dark:file:text-sky-300
                    hover:file:bg-sky-100 dark:hover:file:bg-sky-900"
                />
                <button 
                  type="submit" 
                  className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50" 
                  disabled={newLessonFiles.length === 0 || isUploading}
                >
                  {isUploading 
                    ? `Uploading ${newLessonFiles.length} lesson(s)...` 
                    : `Add ${newLessonFiles.length || ''} Lesson${newLessonFiles.length !== 1 ? 's' : ''}`}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
              <hr className="my-6 border-slate-200 dark:border-slate-700" />
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {selectedCourse.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-2 rounded-md bg-slate-50 dark:bg-slate-700/50">
                    <span className="font-medium text-sm">{lesson.title}</span>
                    <button 
                      onClick={() => deleteLesson(selectedCourse.id, lesson.id)} 
                      className="text-red-500 hover:text-red-700 p-1"
                      aria-label={`Delete lesson: ${lesson.title}`}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
                {selectedCourse.lessons.length === 0 && (
                  <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                    This course has no lessons. Add one above.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-16">Select a course to manage its lessons.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
