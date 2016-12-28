import express from 'express';
import compression from 'compression';
import {createLogger} from 'bunyan';

const staticMaxAge = 2592000000;
const staticCacheControl = `public, max-age=${staticMaxAge}`;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const logger = createLogger({name: 'server-logger'});
const app = express();

function isStatic(url) {
    return !!url.match(/.js$|.css$|.jpg$|.png$/);
}

app.use(compression()); // gzip
app.get('/*', function (req, res, next) {
    if (isStatic(req.url)) {
        res.setHeader("Cache-Control", staticCacheControl);
        res.setHeader("Expires", new Date(Date.now() + staticMaxAge).toUTCString());
    }
    next();
});
app.use(express.static(__dirname + '/build'));

logger.info(`starting server at ${host}:${port}`);
const server = app.listen(port, host, () => {
    const addr = server.address();
    logger.info(`started server at ${addr.address}:${addr.port}`);
});
