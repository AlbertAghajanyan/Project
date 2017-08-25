export const serverPort = 4300;
export const secret = "RbBQqA6uF#msRF8s7h*?@=95HUm&DgMDd6zLFn4XzWQ6dtwXSJwBX#?gL2JWf!";
export const length = 128;
export const digest = "sha256";

export const development = {
    "host": "localhost",
    "port": 5432,
    "database": "project",
    "user": "postgres",
    "password": "root"
};
export const production = {
    "host": "localhost",
    "port": 5432,
    "database": "project",
    "user": "postgres",
    "password": "root"
};

export const devProd = {
    development:{
        db:{
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
        server:{
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
    },
    production:{
        db:{
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
        server:{
            "host": "localhost",
            "port": 5432,
            "database": "project",
            "user": "postgres",
            "password": "root"
        },
    }
};
