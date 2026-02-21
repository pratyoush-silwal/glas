import { useStudent } from '../../contexts/StudentContext';

const RitualList = () => {
  const { rituals, completeRitual } = useStudent();

  const handleComplete = (id) => {
    completeRitual(id);
  };

  return (
    <div className="rpgui-container framed">
      <h2 className="text-xl mb-4">Daily Rituals</h2>
      <div className="grid grid-cols-1 gap-2">
        {rituals.map(ritual => (
          <div key={ritual.id} className="flex justify-between items-center bg-gray-800 p-2 rounded border border-gray-600">
            <div>
              <p className="font-bold">{ritual.name}</p>
              <p className="text-xs text-gray-400">Streak: {ritual.current_streak || 0} 🔥</p>
            </div>
            <button 
              onClick={() => handleComplete(ritual.id)}
              disabled={ritual.completed_today}
              className={`rpgui-button ${ritual.completed_today ? 'grey' : 'golden'} text-xs`}
            >
              {ritual.completed_today ? 'Done' : 'Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RitualList;
