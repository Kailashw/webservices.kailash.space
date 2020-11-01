'use strict';

const Hapi = require('@hapi/hapi');
const pjson = require('./package.json');
const bonuses = require("./connectors/bonusly-client");
const articles = require("./connectors/medium-client");

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const registerRoutes = () => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response({version : pjson.version, message : 'welcome to kailash.space web services built with hapi'})
        }
    });

    server.route({
        method: 'GET',
        path: '/bonuses',
        options: {
            handler: async (request, h) => {
                const response = await bonuses.getMyBonuses();
                return h.response(response);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/latest-achievements',
        options: {
            handler: async (request, h) => {
                const response = await bonuses.getMyAchievements();
                return h.response(response);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/articles',
        options: {
            handler: async (request, h) => {
                const response = await articles.getMyArticles();
                return h.response(response);
            }
        }
    });
}

const init = async () => {
    registerRoutes();
    await server.start();
    return server;
};

init().then(server => {
    console.log('Server running on :', server.info.uri);
}).catch(err => {
    console.log(err);
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
