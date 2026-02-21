import { useState, useEffect } from 'react';
import api from '../../utils/api';

const StudentSkills = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [available, setAvailable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const [enrolledRes, availableRes] = await Promise.all([
        api.get('/student/skills'),
        api.get('/student/available-courses')
      ]);
      setEnrolled(enrolledRes.data.data);
      setAvailable(availableRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/student/enroll', { courseId });
      fetchCourses();
    } catch (err) {
      alert("Enrollment failed");
    }
  };

  if (loading) return <div>Loading skills tree...</div>;

  return (
    <div className="rpgui-content p-4 overflow-y-auto h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Enrolled Courses */}
        <div className="rpgui-container framed-golden">
          <h2 className="text-xl mb-4 border-b pb-2">My Skill Mastery (Enrolled)</h2>
          <div className="space-y-4">
            {enrolled.map(skill => (
              <div key={skill.id} className="rpgui-container framed-grey p-2">
                <h3 className="text-yellow-200">{skill.name}</h3>
                <p className="text-xs">Level: {skill.skill_level} | Mastery: {skill.mastery_points}</p>
                <div className="rpgui-progress blue mt-2">
                   <div className="rpgui-progress-track">
                      <div className="rpgui-progress-fill blue" style={{width: `${(skill.current_xp / skill.max_xp)*100}%`}}></div>
                   </div>
                </div>
              </div>
            ))}
            {enrolled.length === 0 && <p>You haven't mastered any skills yet.</p>}
          </div>
        </div>

        {/* Available Courses */}
        <div className="rpgui-container framed">
          <h2 className="text-xl mb-4 border-b pb-2">Available Skill Paths (Join)</h2>
          <div className="space-y-4">
            {available.map(course => (
              <div key={course.id} className="rpgui-container framed-grey p-2 flex justify-between items-center">
                <div>
                  <h3 className="text-white">{course.name}</h3>
                  <p className="text-xs text-gray-400">{course.code} | {course.teacher_name}</p>
                </div>
                <button className="rpgui-button golden text-xs" onClick={() => handleEnroll(course.id)}>Join</button>
              </div>
            ))}
            {available.length === 0 && <p>No new skill paths available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSkills;
