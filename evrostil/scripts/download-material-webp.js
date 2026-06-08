const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "Pages", "Materijali.js");
const outputRoot = path.join(root, "public", "Materijali");
const source = fs.readFileSync(sourcePath, "utf8");

const jobs = new Map();

function webpName(file) {
    return file.replace(/\.[^.]+$/, ".webp");
}

function addJob(url, relativeOutput) {
    jobs.set(url, path.join(outputRoot, relativeOutput));
}

for (const match of source.matchAll(/u03\("([^"]+)"\)/g)) {
    const file = match[1];
    addJob(
        `https://www.evrostil-m.mk/wp-content/uploads/2016/03/${encodeURI(file)}`,
        path.join("2016-03", webpName(file))
    );
}

for (const match of source.matchAll(/u02\("([^"]+)"\)/g)) {
    const file = match[1];
    addJob(
        `https://www.evrostil-m.mk/wp-content/uploads/2016/02/${encodeURI(file)}`,
        path.join("2016-02", webpName(file))
    );
}

for (const match of source.matchAll(/https?:\/\/www\.evrostil-m\.mk\/wp-content\/uploads\/2016\/(02|03)\/([^"]+\.(?:jpg|jpeg|png))/g)) {
    const [, month, file] = match;
    const decodedFile = decodeURI(file);
    addJob(
        `https://www.evrostil-m.mk/wp-content/uploads/2016/${month}/${file}`,
        path.join(`2016-${month}`, webpName(decodedFile))
    );
}

async function download(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    return Buffer.from(await response.arrayBuffer());
}

async function main() {
    let completed = 0;

    for (const [url, outputPath] of jobs) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        if (!fs.existsSync(outputPath)) {
            const input = await download(url);
            await sharp(input).webp({ quality: 82 }).toFile(outputPath);
        }

        completed += 1;
        console.log(`${completed}/${jobs.size} ${path.relative(outputRoot, outputPath)}`);
    }

    console.log(`Done: ${jobs.size} webp images`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
