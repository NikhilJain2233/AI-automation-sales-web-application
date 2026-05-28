import express from 'express';
import { requireUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', requireUser, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      createdAt: req.user.created_at
    }
  });
});

export default router;
