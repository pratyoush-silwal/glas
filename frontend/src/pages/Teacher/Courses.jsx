import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/teacher/courses');
        setCourses(data.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="border p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">{course.code}: {course.name}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{course.semester} {course.year}</span>
              <span>{course.credits} Credits</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link to={`/teacher/courses/${course.id}`} className="text-blue-500 hover:underline">View Details</Link>
              <Link to={`/teacher/quests/create?courseId=${course.id}`} className="text-green-500 hover:underline">Add Quest</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
