import { useStudent } from '../../contexts/StudentContext';
import { Link } from 'react-router-dom';

const QuestLog = () => {
  const { quests } = useStudent();

  return (
    <div className="rpgui-container framed-golden">
      <h2 className="text-xl mb-4 border-b border-gray-600 pb-2">Quest Log</h2>
      <div className="h-64 overflow-y-auto">
        {quests.length === 0 ? (
          <p>No active quests.</p>
        ) : (
          quests.map(quest => (
            <div key={quest.id} className="rpgui-container framed-grey mb-2 p-2 relative">
              <h3 className="text-lg text-yellow-200">{quest.title}</h3>
              <p className="text-xs text-gray-400">{quest.course_code} - {quest.difficulty}</p>
              <p className="text-sm mt-1">{quest.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-green-400">Reward: {quest.xp_reward} XP</span>
                <Link to={`/student/quests/${quest.id}`} className="rpgui-button golden text-xs py-1 px-2" style={{textDecoration: 'none'}}>View Details</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestLog;
