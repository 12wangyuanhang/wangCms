const config = {
    httpPort: 3007,
    utils: {}
};

if (process.env.port) {
    config.httpPort = process.env.port;
}


module.exports = config;