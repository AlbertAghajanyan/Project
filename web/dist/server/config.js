"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverPort = 4300;
exports.secret = "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!";
exports.length = 128;
exports.digest = "sha256";
exports.development = {
    "host": "localhost",
    "port": 5432,
    "database": "project",
    "user": "postgres",
    "password": "root"
};
exports.production = {
    "host": "localhost",
    "port": 5432,
    "database": "project",
    "user": "postgres",
    "password": "root"
};
exports.devProd = {
    development: {
        db: {
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
        server: {
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
    },
    production: {
        db: {
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
        server: {
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
    }
};
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/config.js.map