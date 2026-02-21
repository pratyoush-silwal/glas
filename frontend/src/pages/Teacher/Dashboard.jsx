import { Routes, Route, Link } from 'react-router-dom';
import TeacherCourses from './Courses';
import CreateQuest from './CreateQuest';
import GradeSubmissions from './GradeSubmissions';

const TeacherDashboard = () => {
  return (
    <div className="p-4 bg-white text-black min-h-screen">
      <nav className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-xl font-bold">GLAS: Teacher Sanctum</h1>
        <div className="flex gap-4">
          <Link to="/teacher" className="hover:text-blue-500">Overview</Link>
          <Link to="/teacher/courses" className="hover:text-blue-500">My Courses</Link>
          <Link to="/teacher/grading" className="hover:text-blue-500">Grade Submissions</Link>
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }} className="text-red-500">Logout</button>
        </div>
      </nav>

      <div className="p-4 border rounded bg-gray-50 min-h-[500px]">
        <Routes>
          <Route index element={
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold mb-4">Master's Overview</h2>
              <p className="text-gray-600 max-w-lg mx-auto">Manage your courses, design epic quests, and evaluate the progress of your aspiring students.</p>
              <div className="mt-8 flex justify-center gap-4">
                 <Link to="/teacher/courses" className="bg-blue-600 text-white px-6 py-2 rounded">Go to Courses</Link>
                 <Link to="/teacher/grading" className="bg-green-600 text-white px-6 py-2 rounded">Start Grading</Link>
              </div>
            </div>
          } />
          <Route path="/courses" element={<TeacherCourses />} />
          <Route path="/quests/create" element={<CreateQuest />} />
          <Route path="/grading" element={<GradeSubmissions />} />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
