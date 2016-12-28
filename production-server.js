import express from 'express';

const staticMaxAge = 2592000000;
const staticCacheControl = `public, max-age=${staticMaxAge}`;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const app = express();

function isStatic(url) {
    return !!url.match(/.js$|.css$|.jpg$|.png$/);
}

app.get('/*', function (req, res, next) {
    if (isStatic(req.url)) {
        res.setHeader("Cache-Control", staticCacheControl);
        res.setHeader("Expires", new Date(Date.now() + staticMaxAge).toUTCString());
    }
    next();
});
app.use(express.static(__dirname + '/build'));

console.log(`starting server at ${host}:${port}`);
const server = app.listen(port, host, () => {
    const addr = server.address();
    console.log(`started server at ${addr.address}:${addr.port}`);
});
