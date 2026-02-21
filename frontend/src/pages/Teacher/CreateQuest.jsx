import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreateQuest = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('courseId');
  
  const [formData, setFormData] = useState({
    courseId: courseId || '',
    title: '',
    description: '',
    xpReward: 50,
    dueDate: '',
    isPublished: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teacher/quests', formData);
      navigate('/teacher/courses');
    } catch (error) {
      alert('Failed to create quest');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Quest</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Quest Title</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea 
            className="w-full border p-2 rounded h-32"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">XP Reward</label>
            <input 
              type="number" 
              className="w-full border p-2 rounded"
              value={formData.xpReward}
              onChange={e => setFormData({...formData, xpReward: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block mb-1">Due Date</label>
            <input 
              type="date" 
              className="w-full border p-2 rounded"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="checkbox"
            checked={formData.isPublished}
            onChange={e => setFormData({...formData, isPublished: e.target.checked})}
          />
          <label>Publish Immediately</label>
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Create Quest
        </button>
      </form>
    </div>
  );
};

export default CreateQuest;
