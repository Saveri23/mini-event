import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  capacity: Number,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
