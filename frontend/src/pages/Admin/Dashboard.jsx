import { Routes, Route, Link } from 'react-router-dom';
import AdminUsers from './Users';

const AdminDashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
       <nav className="bg-white shadow p-4 mb-6 flex justify-between items-center rounded">
          <h1 className="text-xl font-bold text-indigo-700">GLAS: Admin Command Center</h1>
          <div className="flex gap-6">
             <Link to="/admin" className="font-medium hover:text-indigo-600">Home</Link>
             <Link to="/admin/users" className="font-medium hover:text-indigo-600">User Management</Link>
             <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
             }} className="text-red-600 font-medium">Exit Realm (Logout)</button>
          </div>
       </nav>

       <div className="bg-white rounded shadow min-h-[600px] p-6">
          <Routes>
             <Route index element={
               <div className="max-w-4xl mx-auto py-10 text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">System Administrator Overview</h2>
                  <p className="text-lg text-gray-500 mb-8">Oversee the entire realm, monitor user activities, and manage system configuration.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="p-6 border rounded-lg bg-indigo-50">
                        <h3 className="font-bold text-indigo-800 text-lg mb-2">Users</h3>
                        <p className="text-sm text-gray-600 mb-4">Manage student, teacher, and admin accounts.</p>
                        <Link to="/admin/users" className="text-indigo-600 font-bold hover:underline">View All Users →</Link>
                     </div>
                     <div className="p-6 border rounded-lg bg-green-50">
                        <h3 className="font-bold text-green-800 text-lg mb-2">Logs</h3>
                        <p className="text-sm text-gray-600 mb-4">Review system audit trails and action logs.</p>
                        <span className="text-gray-400 italic text-sm">Coming soon</span>
                     </div>
                     <div className="p-6 border rounded-lg bg-orange-50">
                        <h3 className="font-bold text-orange-800 text-lg mb-2">Settings</h3>
                        <p className="text-sm text-gray-600 mb-4">Configure global system parameters.</p>
                        <span className="text-gray-400 italic text-sm">Coming soon</span>
                     </div>
                  </div>
               </div>
             } />
             <Route path="/users" element={<AdminUsers />} />
          </Routes>
       </div>
    </div>
  );
};

export default AdminDashboard;
