import { useEffect, useState } from 'react';
import axios from 'axios';
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1])).id;
  } catch {
    return null;
  }
};

function EventList() {
  const [events, setEvents] = useState([]);
  const userId = getUserIdFromToken();


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const rsvp = async (id) => {
  try {
    await axios.post(
      `http://localhost:5000/api/events/${id}/rsvp`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );

    // Refresh event list properly
    const res = await axios.get('http://localhost:5000/api/events');
    setEvents(res.data);

  } catch (err) {
    alert(err.response?.data?.message || 'Something went wrong');
  }
};


  return (
    <div className="event-grid">
      {events.length > 0 ? (
        events.map((e) => (
          <div className="event-card" key={e._id}>
            <div className="event-content">
              <h3>{e.title}</h3>
              <div className="event-meta">
                {e.attendees.length}/{e.capacity} attending
              </div>
              {e.attendees.length >= e.capacity && (
  <span className="full-badge">Event Full</span>
)}

<button
  className="btn btn-primary"
  disabled={
    e.attendees.includes(userId) ||
    e.attendees.length >= e.capacity
  }
  onClick={() => rsvp(e._id)}
>
  {e.attendees.includes(userId)
    ? 'Joined'
    : e.attendees.length >= e.capacity
    ? 'Full'
    : 'RSVP'}
</button>

            </div>
          </div>
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
}

export default EventList;
