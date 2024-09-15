import Hapi from '@hapi/hapi';
import controller from './controller.js';
import process from 'process';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    server.route(controller);

    // Start the server
    await server.start();
    console.info(`Example app listening on ${server.info.uri}`);
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();