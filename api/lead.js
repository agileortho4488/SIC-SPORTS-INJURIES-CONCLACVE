// POST /api/lead — brochure-download / enquiry lead capture.
// Stores in Postgres when attached; file fallback otherwise. Email copy of every
// lead also goes via FormSubmit from the browser, so nothing is lost pre-DB.
const L = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'POST only' });
  try {
    const b = await L.body(req);
    const { name, email, mobile = '', category = '', source = 'brochure' } = b;
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email || '')) return L.json(res, 400, { error: 'Name and a valid email are required' });
    await L.saveLead({
      id: 'L' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 900 + 100),
      name: String(name).slice(0, 120), email: String(email).slice(0, 160),
      mobile: String(mobile).slice(0, 20), category: String(category).slice(0, 60),
      source: String(source).slice(0, 40),
    });
    return L.json(res, 200, { ok: true });
  } catch {
    return L.json(res, 200, { ok: true }); // lead capture must never block the download
  }
};
