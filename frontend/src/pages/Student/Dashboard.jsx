import { Routes, Route, Link } from 'react-router-dom';
import { StudentProvider } from '../../contexts/StudentContext';
import CharacterSheet from '../../components/student/CharacterSheet';
import QuestLog from '../../components/student/QuestLog';
import RitualList from '../../components/student/RitualList';
import StudentSkills from './Skills';
import QuestDetail from './QuestDetail';
import Leaderboard from './Leaderboard';
import StudentGuilds from './Guilds';
import api from '../../utils/api';

const StudentDashboard = () => {
  const handleDownloadReport = async () => {
    try {
      const response = await api.get('/student/report', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Character_Report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Failed to download report");
    }
  };

  return (
    <StudentProvider>
      <div className="rpgui-content h-screen p-4 overflow-hidden flex flex-col">
        {/* Top Nav */}
        <nav className="rpgui-container framed-golden flex gap-4 mb-4 p-2 overflow-x-auto whitespace-nowrap">
          <Link to="/student" className="rpgui-button">Main</Link>
          <Link to="/student/skills" className="rpgui-button">Skills</Link>
          <Link to="/student/leaderboard" className="rpgui-button">Leaderboard</Link>
          <Link to="/student/guilds" className="rpgui-button">Guilds</Link>
          <button className="rpgui-button golden" onClick={handleDownloadReport}>Report</button>
          <button className="rpgui-button" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}>Logout</button>
        </nav>

        {/* Main Content Area with Routing */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={
              <div className="grid grid-cols-12 gap-4">
                {/* Left Column: Character */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                  <CharacterSheet />
                  <RitualList />
                </div>
                {/* Right Column: Quests & Main View */}
                <div className="col-span-12 lg:col-span-8">
                  <QuestLog />
                  <div className="rpgui-container framed mt-4" style={{minHeight: '100px'}}>
                     <h3>Announcements</h3>
                     <p>Check the Skills tab to join new courses!</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/skills" element={<StudentSkills />} />
            <Route path="/quests/:id" element={<QuestDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/guilds" element={<StudentGuilds />} />
          </Routes>
        </div>
      </div>
    </StudentProvider>
  );
};

export default StudentDashboard;
