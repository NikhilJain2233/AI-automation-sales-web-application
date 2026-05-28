import { supabaseAdmin } from '../supabase.js';

export async function requireUser(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token.' });
  }

  if (!supabaseAdmin) {
    return res.status(503).json({ message: 'Supabase is not configured on the server.' });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }

  req.user = data.user;
  return next();
}
