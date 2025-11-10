import React, { useState } from 'react';
import type { Course } from '../types';
import { TrashIcon } from './icons';

interface AdminPageProps {
  courses: Course[];
  addCourse: (title: string) => void;
  deleteCourse: (id: string) => void;
  addVideo: (courseId: string, title: string, description: string, file: File) => Promise<void>;
  deleteVideo: (courseId: string, videoId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({
  courses,
  addCourse,
  deleteCourse,
  addVideo,
  deleteVideo,
}) => {
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDescription, setNewVideoDescription] = useState('');
  const [newVideoFiles, setNewVideoFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourseTitle.trim()) {
      addCourse(newCourseTitle.trim());
      setNewCourseTitle('');
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourseId && newVideoFiles.length > 0) {
      setIsUploading(true);
      setError(null);
      try {
        for (const file of newVideoFiles) {
            // Use filename as title if title field is empty or if uploading multiple files
            const title = newVideoFiles.length > 1 ? file.name.replace(/\.[^/.]+$/, "") : newVideoTitle.trim() || file.name.replace(/\.[^/.]+$/, "");
            await addVideo(selectedCourseId, title, newVideoDescription.trim(), file);
        }
        
        setNewVideoTitle('');
        setNewVideoDescription('');
        setNewVideoFiles([]);
        const fileInput = document.getElementById('video-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

      } catch (err) {
        console.error(err);
        setError('Failed to upload one or more videos. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

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
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">({course.videos.length} videos)</span>
                </button>
                <button onClick={() => deleteCourse(course.id)} className="text-red-500 hover:text-red-700 p-1">
                  <TrashIcon />
                </button>
              </div>
            ))}
             {courses.length === 0 && <p className="text-center text-slate-500 dark:text-slate-400 py-4">No courses yet. Add one above.</p>}
          </div>
        </div>

        {/* Video Management */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Videos</h2>
          {selectedCourse ? (
            <div>
              <h3 className="text-xl font-semibold mb-3">Add video(s) to <span className="text-sky-500">{selectedCourse.title}</span></h3>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <input
                  type="text"
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="Video title (optional for multiple files)"
                  className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
                />
                <textarea
                  value={newVideoDescription}
                  onChange={(e) => setNewVideoDescription(e.target.value)}
                  placeholder="Video description (applies to all)"
                  rows={3}
                  className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md border-slate-300 dark:border-slate-600 focus:ring-sky-500 focus:border-sky-500"
                />
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => setNewVideoFiles(e.target.files ? Array.from(e.target.files) : [])}
                  required
                  className="w-full text-sm text-slate-500 dark:text-slate-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-sky-50 file:text-sky-700
                    dark:file:bg-sky-900/50 dark:file:text-sky-300
                    hover:file:bg-sky-100 dark:hover:file:bg-sky-900"
                />
                <button type="submit" className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-50" disabled={newVideoFiles.length === 0 || isUploading}>
                  {isUploading ? `Uploading ${newVideoFiles.length} videos...` : `Add ${newVideoFiles.length || ''} Video(s)`}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
              <hr className="my-6 border-slate-200 dark:border-slate-700" />
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {selectedCourse.videos.map(video => (
                  <div key={video.id} className="flex items-center justify-between p-2 rounded-md bg-slate-50 dark:bg-slate-700/50">
                    <span className="font-medium text-sm">{video.title}</span>
                    <button onClick={() => deleteVideo(selectedCourse.id, video.id)} className="text-red-500 hover:text-red-700 p-1">
                      <TrashIcon />
                    </button>
                  </div>
                ))}
                 {selectedCourse.videos.length === 0 && <p className="text-center text-slate-500 dark:text-slate-400 py-4">This course has no videos. Add one above.</p>}
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-16">Select a course to manage its videos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
