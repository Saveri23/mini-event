import { useState } from 'react';
import axios from 'axios';


function EventForm() {
const [title, setTitle] = useState('');
const [capacity, setCapacity] = useState('');


const submit = async () => {
await axios.post('http://localhost:5000/api/events',
{ title, capacity },
{ headers: { Authorization: localStorage.getItem('token') } }
);
window.location.reload();
};


return (
<div className="event-form">
<h3>Create Event</h3>
<input placeholder="Event Title" onChange={e => setTitle(e.target.value)} />
<input placeholder="Capacity" type="number" onChange={e => setCapacity(e.target.value)} />
<button className="btn btn-primary" onClick={submit}>Create</button>
</div>
);
}


export default EventForm;