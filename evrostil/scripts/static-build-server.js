const fs = require("fs");
const http = require("http");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const root = path.resolve(__dirname, "..", "build");
const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".json": "application/json",
    ".mp4": "video/mp4",
};

const server = http.createServer((request, response) => {
    let pathname = decodeURIComponent(request.url.split("?")[0]);

    if (pathname === "/" || pathname === "") {
        pathname = "/index.html";
    }

    let filePath = path.join(root, pathname);

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(root, "index.html");
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": types[extension] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});
