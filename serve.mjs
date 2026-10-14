// Server di sviluppo con ricaricamento automatico: node serve.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = 5173;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon' };
const clients = new Set();
const snippet = `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>`;

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(': ok\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  let file = path.join(root, url);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Non trovato'); }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': (types[ext] || 'application/octet-stream') + '; charset=utf-8', 'Cache-Control': 'no-store' });
    const live = ext === '.html' && !/Headless/.test(req.headers['user-agent'] || '');
    res.end(live ? data.toString().replace('</body>', snippet + '</body>') : data);
  });
}).listen(port, () => console.log(`http://localhost:${port}`));

let timer;
fs.watch(root, { recursive: true }, (_, name) => {
  if (!name || name.includes('node_modules')) return;
  clearTimeout(timer);
  timer = setTimeout(() => clients.forEach(c => c.write('data: reload\n\n')), 120);
});
