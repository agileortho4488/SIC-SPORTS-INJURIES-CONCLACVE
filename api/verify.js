// POST /api/verify — Razorpay signature check → mark paid, email pass link.
const L = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return L.json(res, 405, { error: 'POST only' });
  try {
    const { id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await L.body(req);
    const rec = await L.getReg(id);
    if (!rec || rec.order_id !== razorpay_order_id) return L.json(res, 400, { error: 'Unknown registration' });
    if (!L.verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature))
      return L.json(res, 400, { error: 'Payment verification failed' });
    await L.updateReg(id, { status: 'paid', payment_id: razorpay_payment_id });
    const sig = L.sign(id);
    const base = process.env.SITE_URL || 'https://sic-sports-injuries-conclacve.vercel.app';
    L.sendMail(rec.email, 'SIC 2027 — registration confirmed',
      `<p>Dear ${rec.name},</p><p>Your registration <b>${id}</b> for SIC 2027 (29th &amp; 30th January 2027, Hyderabad) is confirmed.</p>
       <p><a href="${base}/pass.html?id=${id}&sig=${sig}">Download your delegate pass with QR code</a> — you will need it at check-in.</p>
       <p>— Organizing Committee, SIC 2027</p>`);
    return L.json(res, 200, { ok: true, id, sig });
  } catch {
    return L.json(res, 500, { error: 'Verification failed' });
  }
};
