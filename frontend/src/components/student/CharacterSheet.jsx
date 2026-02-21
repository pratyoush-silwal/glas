import { useStudent } from '../../contexts/StudentContext';

const CharacterSheet = () => {
  const { profile, loading } = useStudent();

  if (loading || !profile) return <div className="rpgui-container framed">Loading Profile...</div>;

  return (
    <div className="rpgui-container framed-golden-2 relative">
      <div className="flex gap-4">
        <div className="w-1/3 text-center">
          <div className="rpgui-icon sword mb-2" style={{width:'64px', height:'64px', margin:'0 auto', backgroundColor:'gray'}}></div>
          <h2 className="text-xl text-yellow-400">{profile.character_name}</h2>
          <p className="text-sm">{profile.race_name} {profile.class_name}</p>
          <p className="text-xs text-gray-400">Level {profile.level}</p>
        </div>
        
        <div className="w-2/3">
          <div className="mb-2">
            <label>HP: {profile.current_hp} / {profile.max_hp}</label>
            <div className="rpgui-progress red" data-rpguitype="progress">
              <div className=" rpgui-progress-track">
                <div className="rpgui-progress-fill red" style={{width: `${(profile.current_hp/profile.max_hp)*100}%`}}></div>
              </div>
            </div>
          </div>
          
          <div className="mb-2">
            <label>XP: {profile.experience_points}</label>
            <div className="rpgui-progress blue">
               <div className="rpgui-progress-track">
                <div className="rpgui-progress-fill blue" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
            <div>STR: {profile.strength}</div>
            <div>DEX: {profile.dexterity}</div>
            <div>INT: {profile.intelligence}</div>
            <div>WIS: {profile.wisdom}</div>
            <div>CON: {profile.constitution}</div>
            <div>CHA: {profile.charisma}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
