import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={submit}>
          Login
        </button>

        <p
          style={{ cursor: 'pointer', marginTop: 10 }}
          onClick={() => navigate('/register')}
        >
          New user? Register
        </p>
      </div>
    </div>
  );
}

export default Login;
