import { createServer } from "http";
import { parse } from "url";
import next from "next";
import os from 'os';

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName of Object.keys(interfaces)) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // Fallback
};

const localIP = getLocalIP();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, '0.0.0.0', () => {
    console.log(`> Server listening on all interfaces (0.0.0.0:${port})`);
    console.log(`> You can access it via:`);
    console.log(`  - http://localhost:${port}`);
    console.log(`  - http://${localIP}:${port} (local network)`);
    console.log(`Running in ${dev ? "development" : process.env.NODE_ENV} mode`);
  });
});