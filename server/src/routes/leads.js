import express from 'express';
import { supabaseAdmin } from '../supabase.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  if (!supabaseAdmin) {
    return res.status(503).json({ message: 'Lead storage is not configured yet.' });
  }

  const { error } = await supabaseAdmin.from('leads').insert({
    name,
    email,
    company,
    message,
    source: 'website'
  });

  if (error) {
    return res.status(500).json({ message: 'Could not save the lead.', details: error.message });
  }

  return res.status(201).json({ message: 'Consultation request received.' });
});

export default router;
