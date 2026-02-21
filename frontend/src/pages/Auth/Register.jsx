import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
    characterName: '',
    classId: '',
    raceId: '',
    academicLevelId: '1' // Default to Freshman Fall
  });
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // We'll need public endpoints for these or just mock them for now
        // Let's assume we have them or can just use IDs 1-5
        const [classesRes, racesRes] = await Promise.all([
          api.get('/guilds'), // Just to test api connection, we might not have meta endpoints yet
        ]);
        // For now, let's manually define some or try to fetch
        // Since I'm the dev, I'll just add the endpoints to the backend if needed
      } catch (err) {
        console.log("Meta fetch failed, using defaults");
      }
    };
    fetchMetadata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="rpgui-content h-screen p-4 flex justify-center items-center overflow-y-auto">
      <div className="rpgui-container framed-golden" style={{width: '500px', marginTop: '50px', marginBottom: '50px'}}>
        <h1 style={{textAlign: 'center', fontSize: '24px'}}>New Recruit</h1>
        <hr className="golden" />
        
        {error && <p style={{color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label>Username:</label>
          <input 
            type="text" 
            value={formData.username} 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="rpgui-input"
            required
          />

          <label>Email:</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="rpgui-input"
            required
          />

          <label>Password:</label>
          <input 
            type="password" 
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="rpgui-input"
            required
          />

          <hr />

          <label>Character Name:</label>
          <input 
            type="text" 
            value={formData.characterName} 
            onChange={(e) => setFormData({...formData, characterName: e.target.value})}
            className="rpgui-input"
            required
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label>Class:</label>
              <select 
                className="rpgui-dropdown"
                value={formData.classId}
                onChange={(e) => setFormData({...formData, classId: e.target.value})}
                required
              >
                <option value="">Select Class</option>
                <option value="1">Warrior</option>
                <option value="2">Mage</option>
                <option value="3">Rogue</option>
                <option value="4">Cleric</option>
                <option value="5">Ranger</option>
              </select>
            </div>
            <div className="w-1/2">
              <label>Race:</label>
              <select 
                className="rpgui-dropdown"
                value={formData.raceId}
                onChange={(e) => setFormData({...formData, raceId: e.target.value})}
                required
              >
                <option value="">Select Race</option>
                <option value="1">Human</option>
                <option value="2">Elf</option>
                <option value="3">Dwarf</option>
                <option value="4">Orc</option>
                <option value="5">Halfling</option>
              </select>
            </div>
          </div>

          <button className="rpgui-button" type="submit" style={{marginTop: '20px'}}>Sign the Charter</button>
        </form>

        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <Link to="/login" style={{color: 'white', fontSize: '12px'}}>Already a member? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
