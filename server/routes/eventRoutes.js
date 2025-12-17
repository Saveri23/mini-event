import express from 'express';
import mongoose from 'mongoose';   // ✅ ADD THIS HERE

import Event from '../models/Event.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

/* ======================
   CREATE EVENT
====================== */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, location, capacity, image } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      image,
      createdBy: req.user.id
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   GET ALL EVENTS
====================== */
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   RSVP EVENT
====================== */
router.post('/:id/rsvp', auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        attendees: { $ne: userId },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
      },
      { $push: { attendees: userId } },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: 'Event full or already joined'
      });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;