// Thanks to: https://github.com/mjhea0/typescript-node-api
import * as http from 'http';
//import * as debug from 'debug';
import { blockChainNetwork } from "./blockChainNetwork";
import { App } from './app';

async function start() {
    await blockChainNetwork.connect();
    const debug = console.log;
    const port = normalizePort(process.env.PORT || 3000);
    const app = new App();
    app.express.set('port', port);
    
    const server = http.createServer(app.express);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening(): void {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    }
}

start();