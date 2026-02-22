import { useState, useEffect } from 'react';
import api from '../../utils/api';

const GradeSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [gradeData, setGradeData] = useState({
    grade: 100,
    feedback: '',
    stats: {
      xp: 100,
      gold: 10,
      str: 0,
      int: 0,
      dex: 0,
      con: 0,
      wis: 0,
      cha: 0
    }
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/teacher/submissions/pending');
      setSubmissions(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (e) => {
    e.preventDefault();
    try {
      await api.post('/teacher/submissions/grade', {
        submissionId: selectedSub.id,
        ...gradeData
      });
      setSelectedSub(null);
      fetchSubmissions();
    } catch (err) {
      alert("Grading failed");
    }
  };

  if (loading) return <div>Loading submissions...</div>;

  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-4 border-r pr-4">
        <h2 className="text-xl font-bold mb-4">Pending Submissions</h2>
        <div className="space-y-2">
          {submissions.map(sub => (
            <div 
              key={sub.id} 
              className={`p-3 border rounded cursor-pointer ${selectedSub?.id === sub.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedSub(sub)}
            >
              <p className="font-bold">{sub.character_name}</p>
              <p className="text-sm">{sub.quest_title}</p>
            </div>
          ))}
          {submissions.length === 0 && <p>No pending work.</p>}
        </div>
      </div>

      <div className="col-span-8 pl-4">
        {selectedSub ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Grading: {selectedSub.character_name}</h2>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <h3 className="font-bold mb-1">Student Content:</h3>
              <p className="mb-4">{selectedSub.content}</p>
              
              {selectedSub.files && selectedSub.files.length > 0 && (
                <div className="border-t pt-2">
                  <h4 className="font-bold text-sm mb-2 text-blue-800">Attached Artifacts:</h4>
                  <ul className="space-y-1">
                    {selectedSub.files.map((file, idx) => (
                      <li key={idx} className="text-sm">
                        <a 
                          href={`/uploads/submissions/${file.file_name}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          📄 {file.file_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <form onSubmit={handleGrade} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Grade (0-100)</label>
                  <input 
                    type="number" 
                    className="w-full border p-2"
                    value={gradeData.grade}
                    onChange={e => setGradeData({...gradeData, grade: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block">Feedback</label>
                  <textarea 
                    className="w-full border p-2"
                    value={gradeData.feedback}
                    onChange={e => setGradeData({...gradeData, feedback: e.target.value})}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold mb-2">Stat Rewards</h3>
                <div className="grid grid-cols-4 gap-2">
                   {['str', 'int', 'dex', 'con', 'wis', 'cha', 'xp', 'gold'].map(stat => (
                     <div key={stat}>
                       <label className="block text-xs uppercase">{stat}</label>
                       <input 
                        type="number"
                        className="w-full border p-1"
                        value={gradeData.stats[stat]}
                        onChange={e => setGradeData({
                          ...gradeData, 
                          stats: {...gradeData.stats, [stat]: parseInt(e.target.value)}
                        })}
                       />
                     </div>
                   ))}
                </div>
              </div>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Grade & Stats</button>
            </form>
          </div>
        ) : (
          <p className="text-gray-500">Select a submission to grade.</p>
        )}
      </div>
    </div>
  );
};

export default GradeSubmissions;
