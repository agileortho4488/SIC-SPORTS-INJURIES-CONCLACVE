// GET /api/export?key=ADMIN_KEY — CSV of all registrations (the TSMC delegate list).
const L = require('./_lib');

module.exports = async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const adminKey = process.env.ADMIN_KEY || (L.TEST_MODE ? 'demo' : null);
  if (!adminKey || u.searchParams.get('key') !== adminKey) return L.json(res, 403, { error: 'Forbidden' });
  if (u.searchParams.get('type') === 'leads') {
    const leads = await L.allLeads();
    const esc2 = v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
    const csv2 = ['id,name,email,mobile,category,source,created_at'].concat(leads.map(r =>
      [r.id, r.name, r.email, r.mobile, r.category, r.source, r.created_at].map(esc2).join(','))).join('\n');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="sic2027-leads.csv"');
    return res.end(csv2);
  }
  const rows = await L.allRegs();
  const esc = v => `"${String(v == null ? '' : v).replace(/"/g, '""')}"`;
  const head = 'id,name,email,mobile,category,council,council_reg_no,status,amount_inr,created_at,checked_in_at';
  const csv = [head].concat(rows.map(r =>
    [r.id, r.name, r.email, r.mobile, r.category, r.council, r.council_reg_no, r.status, (r.amount || 0) / 100, r.created_at, r.checked_in_at || ''].map(esc).join(',')
  )).join('\n');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="sic2027-delegates.csv"');
  res.end(csv);
};
