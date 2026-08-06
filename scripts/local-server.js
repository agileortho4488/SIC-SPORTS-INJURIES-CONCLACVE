// Local dev shim: static files + /api/* routed to the Vercel-style handlers.
// Usage: node scripts/local-server.js [port]   (demo mode unless env vars set)
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = process.argv[2] || 8080;
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.json': 'application/json', '.md': 'text/plain' };

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname.startsWith('/api/')) {
    const name = u.pathname.slice(5).replace(/[^a-z_-]/g, '');
    const mod = path.join(root, 'api', name + '.js');
    if (!fs.existsSync(mod)) { res.statusCode = 404; return res.end('{"error":"no such api"}'); }
    try { await require(mod)(req, res); } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })); }
    return;
  }
  let p = path.join(root, decodeURIComponent(u.pathname === '/' ? 'index.html' : u.pathname.slice(1)));
  if (!p.startsWith(root)) { res.statusCode = 403; return res.end(); }
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
  fs.createReadStream(p).pipe(res);
}).listen(port, () => console.log('SIC local server http://localhost:' + port + (process.env.RAZORPAY_KEY_ID ? ' (LIVE payment mode)' : ' (DEMO mode)')));
