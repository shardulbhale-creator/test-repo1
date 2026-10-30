import localtunnel from 'localtunnel';
import fs from 'fs';

(async () => {
  try {
    const tunnel = await localtunnel({ port: 5173 });
    const info = `Tunnel URL: ${tunnel.url}`;
    console.log(info);
    fs.writeFileSync('tunnel-url.txt', tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Failed to create tunnel:', err);
  }
})();
