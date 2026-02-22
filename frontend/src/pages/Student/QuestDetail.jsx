import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const QuestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const { data } = await api.get('/student/quests');
        const found = data.data.find(q => q.id === parseInt(id));
        setQuest(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuest();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append('questId', id);
    formData.append('content', content);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await api.post('/student/submit-quest', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Quest submitted!");
      navigate('/student/quests');
    } catch (err) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  if (loading) return <div className="rpgui-container framed">Loading quest...</div>;
  if (!quest) return <div className="rpgui-container framed">Quest not found.</div>;

  return (
    <div className="rpgui-content p-4">
      <div className="rpgui-container framed-golden">
        <h1 className="text-2xl text-yellow-400 mb-2">{quest.title}</h1>
        <p className="text-xs text-gray-400 mb-4">{quest.course_code} | {quest.difficulty} Difficulty</p>
        
        <div className="rpgui-container framed-grey mb-6">
          <p className="text-lg">{quest.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
           <div className="text-green-400">Reward: {quest.xp_reward} XP</div>
           <div className="text-yellow-400">Reward: {quest.gold_reward} Gold</div>
           <div className="text-red-400">Due: {new Date(quest.due_date).toLocaleDateString()}</div>
           <div>Status: <span className="uppercase">{quest.submission_status || 'not started'}</span></div>
        </div>

        <hr className="golden" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label>Your Submission Text:</label>
          <textarea 
            className="rpgui-input"
            rows="5"
            style={{width: '100%'}}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Describe your progress..."
            required
          />

          <label>Attachments (PDF, Images):</label>
          <input 
            type="file" 
            className="rpgui-button golden text-xs"
            multiple 
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            style={{width: '100%', marginBottom: '10px'}}
          />
          <p className="text-xs text-gray-500">You can select multiple files.</p>

          <button 
            type="submit" 
            className={`rpgui-button ${submitting ? 'grey' : 'golden'}`}
            disabled={submitting}
          >
            {submitting ? 'Casting Spell...' : 'Submit Quest'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestDetail;
