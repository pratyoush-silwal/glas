import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      const user = result.user;
      if (user.role === 'student') navigate('/student');
      else if (user.role === 'teacher') navigate('/teacher');
      else if (user.role === 'admin') navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="rpgui-content h-screen flex justify-center items-center">
      <div className="rpgui-container framed-golden" style={{width: '400px'}}>
        <h1 style={{textAlign: 'center', fontSize: '24px'}}>GLAS Login</h1>
        <hr className="golden" />
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="rpgui-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="rpgui-input"
          />
          <button className="rpgui-button" type="submit">Enter Realm</button>
        </form>
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <p>New adventurer?</p>
          <Link to="/register" className="rpgui-button golden" style={{display: 'inline-block', textDecoration: 'none'}}>Join Guild (Register)</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
