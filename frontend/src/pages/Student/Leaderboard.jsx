import LeaderboardTable from '../../components/student/LeaderboardTable';

const Leaderboard = () => {
  return (
    <div className="rpgui-content p-4 overflow-y-auto h-screen">
      <div className="flex justify-center items-center">
        <div style={{width: '600px', maxWidth: '100%'}}>
           <LeaderboardTable />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
