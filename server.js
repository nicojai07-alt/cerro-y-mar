const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec, spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Normalize URL
  let reqUrl = decodeURI(req.url.split('?')[0]);
  if (reqUrl === '/') reqUrl = '/index.html';

  const filePath = path.join(BASE_DIR, reqUrl);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Prohibido');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 No Encontrado</h1><p>El archivo solicitado no existe.</p>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Helper to get local Wi-Fi / LAN IPs
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push({ name, address: iface.address });
      }
    }
  }
  return ips;
}

server.listen(PORT, '0.0.0.0', () => {
  const localIPs = getLocalIPs();
  console.log('\n================================================================');
  console.log('🚀 SERVIDOR WEB ACTIVO - CERRO & MAR');
  console.log('================================================================');
  console.log(`\n🏠 En esta misma computadora:`);
  console.log(`   👉 http://localhost:${PORT}`);

  console.log(`\n📶 En cualquier celular o dispositivo conectado al mismo Wi-Fi:`);
  localIPs.forEach(ip => {
    console.log(`   👉 http://${ip.address}:${PORT} (${ip.name})`);
  });

  console.log('\n🌐 Generando URL pública para cualquier red / internet...');
  console.log('================================================================\n');

  // Start Localtunnel only in local development (not in production / Render)
  if (!process.env.RENDER && process.env.NODE_ENV !== 'production') {
    try {
      const lt = spawn('npx', ['-y', 'localtunnel', '--port', PORT], { shell: true });

      lt.stdout.on('data', (data) => {
        const text = data.toString();
        console.log(`[TÚNEL PÚBLICO]: ${text.trim()}`);
      });

      lt.stderr.on('data', () => {});
    } catch (e) {
      // ignore
    }
  }
});

