import EventForm from './EventForm';
import EventList from './EventList';

import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');   // 🔑 IMPORTANT
    navigate('/');  
  }
return (
<div className="container">
<div className="dashboard-header">
<h2>Event Dashboard</h2>
<button className="btn btn-danger" onClick={(logout)}>Logout</button>
</div>
<EventForm />
<EventList />
</div>
);
}


export default Dashboard;