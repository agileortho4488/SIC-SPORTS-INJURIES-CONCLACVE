// GET /api/delegate?id&sig — pass/certificate data (sig-protected).
const L = require('./_lib');

module.exports = async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const id = u.searchParams.get('id'), sig = u.searchParams.get('sig');
  if (!id || !L.verifySig(id, sig)) return L.json(res, 403, { error: 'Invalid pass link' });
  const r = await L.getReg(id);
  if (!r || (r.status !== 'paid' && r.status !== 'test')) return L.json(res, 404, { error: 'Registration not found or unpaid' });
  return L.json(res, 200, {
    id: r.id, name: r.name, category: L.CATEGORIES[r.category] ? L.CATEGORIES[r.category].label : r.category,
    council: r.council, council_reg_no: r.council_reg_no,
    status: r.status, checked_in: !!r.checked_in_at,
    certificates_open: process.env.CERTS_ENABLED === '1',
    cme_line: process.env.CME_LINE || 'CME credit points: applied — TSMC (final count on approval)',
  });
};
