import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [quests, setQuests] = useState([]);
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, skillsRes, questsRes, ritualsRes] = await Promise.all([
        api.get('/student/profile'),
        api.get('/student/skills'),
        api.get('/student/quests'),
        api.get('/student/rituals')
      ]);
      
      setProfile(profileRes.data.data);
      setSkills(skillsRes.data.data);
      setQuests(questsRes.data.data);
      setRituals(ritualsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch student data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchData();
    }
  }, [user]);

  const completeRitual = async (ritualId) => {
    try {
      const { data } = await api.post('/student/rituals/complete', { ritualId });
      if (data.success) {
        // Optimistic update or refetch
        fetchData(); 
        return { success: true, message: data.message };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <StudentContext.Provider value={{ profile, skills, quests, rituals, loading, completeRitual }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
