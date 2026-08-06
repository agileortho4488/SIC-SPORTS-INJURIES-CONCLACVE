// POST /api/checkin — volunteer scanner: {id, sig, pin} → mark attendance.
const L = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'POST only' });
  const { id, sig, pin } = await L.body(req);
  const staffPin = process.env.STAFF_PIN || (L.TEST_MODE ? '2027' : null);
  if (!staffPin || String(pin) !== staffPin) return L.json(res, 403, { error: 'Wrong staff PIN' });
  if (!id || !L.verifySig(id, sig)) return L.json(res, 403, { error: 'Invalid or forged pass' });
  const r = await L.getReg(id);
  if (!r || (r.status !== 'paid' && r.status !== 'test')) return L.json(res, 404, { error: 'Not a paid registration' });
  const already = !!r.checked_in_at;
  if (!already) await L.updateReg(id, { checked_in_at: new Date().toISOString() });
  return L.json(res, 200, {
    ok: true, already,
    name: r.name, category: L.CATEGORIES[r.category] ? L.CATEGORIES[r.category].label : r.category, id: r.id,
  });
};
