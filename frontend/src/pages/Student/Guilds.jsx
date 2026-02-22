import { useState, useEffect } from 'react';
import api from '../../utils/api';

const StudentGuilds = () => {
  const [allGuilds, setAllGuilds] = useState([]);
  const [myGuild, setMyGuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchGuildData();
  }, []);

  const fetchGuildData = async () => {
    try {
      setLoading(true);
      const [allRes, myRes] = await Promise.all([
        api.get('/guilds'),
        api.get('/guilds/my-guild')
      ]);
      setAllGuilds(allRes.data.data);
      setMyGuild(myRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (guildId) => {
    try {
      await api.post('/guilds/join', { guildId });
      fetchGuildData();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to join guild");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/guilds', formData);
      setShowCreate(false);
      setFormData({ name: '', description: '' });
      fetchGuildData();
    } catch (err) {
      alert("Failed to create guild");
    }
  };

  if (loading) return <div className="rpgui-container framed">Loading Guild Halls...</div>;

  return (
    <div className="rpgui-content p-4 overflow-y-auto h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* My Guild */}
        <div className="rpgui-container framed-golden">
          <h2 className="text-xl mb-4 border-b pb-2">My Guild</h2>
          {myGuild ? (
            <div className="rpgui-container framed-grey p-4">
              <h3 className="text-yellow-400 text-xl">{myGuild.name}</h3>
              <p className="text-sm mb-4">{myGuild.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Level: {myGuild.level}</div>
                <div>Members: {myGuild.members_count}</div>
                <div className="col-span-2">Your Role: <span className="uppercase text-green-400">{myGuild.role}</span></div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="mb-4">You are not a member of any guild.</p>
              <button 
                className="rpgui-button golden" 
                onClick={() => setShowCreate(true)}
              >
                Form a New Guild
              </button>
            </div>
          )}
        </div>

        {/* Available Guilds */}
        <div className="rpgui-container framed">
          <h2 className="text-xl mb-4 border-b pb-2">Guild Directory</h2>
          <div className="space-y-4">
            {allGuilds.filter(g => g.id !== myGuild?.id).map(guild => (
              <div key={guild.id} className="rpgui-container framed-grey p-2 flex justify-between items-center">
                <div>
                  <h3 className="text-white">{guild.name}</h3>
                  <p className="text-xs text-gray-400">{guild.members_count} Members | Level {guild.level}</p>
                </div>
                {!myGuild && (
                  <button 
                    className="rpgui-button golden text-xs" 
                    onClick={() => handleJoin(guild.id)}
                  >
                    Join
                  </button>
                )}
              </div>
            ))}
            {allGuilds.length === 0 && <p>No guilds have been formed yet.</p>}
          </div>
        </div>
      </div>

      {/* Create Guild Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="rpgui-container framed-golden" style={{maxWidth: '500px', width: '100%'}}>
            <h2 className="text-xl mb-4">Form New Guild</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <label>Guild Name:</label>
              <input 
                type="text" 
                className="rpgui-input"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <label>Description:</label>
              <textarea 
                className="rpgui-input"
                rows="3"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
              <div className="flex gap-4 mt-4">
                <button type="submit" className="rpgui-button golden flex-1">Charter Guild</button>
                <button 
                  type="button" 
                  className="rpgui-button flex-1"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGuilds;
