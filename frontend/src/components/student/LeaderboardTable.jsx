import { useState, useEffect } from 'react';
import api from '../../utils/api';

const LeaderboardTable = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const { data } = await api.get('/student/leaderboard');
        setLeaders(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) return <div>Loading Leaderboard...</div>;

  return (
    <div className="rpgui-container framed">
      <h2 className="text-xl mb-4">Hall of Fame</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2">Hero</th>
            <th className="p-2">Class</th>
            <th className="p-2">Level</th>
            <th className="p-2">XP</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-2">{leader.character_name} ({leader.username})</td>
              <td className="p-2">{leader.class_name}</td>
              <td className="p-2">{leader.level}</td>
              <td className="p-2">{leader.experience_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
