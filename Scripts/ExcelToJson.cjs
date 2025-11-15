// scripts/excel-to-json.cjs
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const inputPath = path.resolve(process.cwd(), 'CourseStructure.xlsx');
const outPath = path.resolve(process.cwd(), 'src', 'data', 'courses.json');

if (!fs.existsSync(inputPath)) {
  console.error(`Excel file not found at ${inputPath}`);
  process.exit(1);
}

const wb = XLSX.readFile(inputPath);
const sheetName = wb.SheetNames[0];
const ws = wb.Sheets[sheetName];
const raw = XLSX.utils.sheet_to_json(ws, { defval: '' });

const coursesMap = new Map();

raw.forEach(row => {
  const courseId = String(row['course_id'] ?? row['Course ID'] ?? row['courseId'] ?? '').trim();
  if (!courseId) return;

  if (!coursesMap.has(courseId)) {
    coursesMap.set(courseId, {
      id: courseId,
      title: String(row['course_name'] ?? row['Course Name'] ?? row['Title'] ?? '').trim() || `Course ${courseId}`,
      description: String(row['course_description'] ?? row['Description'] ?? '').trim() || '',
      category: String(row['category'] ?? '').trim() || '',
      lessons: []
    });
  }

  const course = coursesMap.get(courseId);
  const lessonId = String(row['lesson_id'] ?? row['Lesson ID'] ?? '').trim() || `${courseId}-${course.lessons.length+1}`;

  course.lessons.push({
    id: lessonId,
    title: String(row['lesson_title'] ?? row['Lesson Title'] ?? '').trim() || `Lesson ${lessonId}`,
    video: String(row['video_url'] ?? row['Video URL'] ?? '').trim(),
    notebook: String(row['notebook_url'] ?? row['Notebook URL'] ?? '').trim(),
    assessment: String(row['assessment_url'] ?? row['Assessment URL'] ?? '').trim()
  });
});

const courses = Array.from(coursesMap.values());
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(courses, null, 2), 'utf-8');
console.log(`Wrote ${courses.length} courses to ${outPath}`);
