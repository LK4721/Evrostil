const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const rasterExtensions = new Set([".png", ".jpg", ".jpeg", ".jfif"]);
const textExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json"]);
const imageRoots = ["public", "src"].map((directory) => path.join(root, directory));
const textRoots = imageRoots;

function walk(directory, files = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath, files);
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

function toPosix(filePath) {
    return filePath.replace(/\\/g, "/");
}

function getWebpPath(filePath) {
    return filePath.slice(0, -path.extname(filePath).length) + ".webp";
}

function publicUrlToFile(urlPath) {
    const cleanPath = urlPath.replace(/^%PUBLIC_URL%\//, "").replace(/^\//, "");
    return path.join(root, "public", cleanPath);
}

function resolveReference(reference, sourceFile) {
    if (/^https?:\/\//i.test(reference) || reference.startsWith("data:")) {
        return null;
    }

    if (reference.startsWith("%PUBLIC_URL%/") || reference.startsWith("/")) {
        return publicUrlToFile(reference);
    }

    if (reference.startsWith("./") || reference.startsWith("../")) {
        return path.resolve(path.dirname(sourceFile), reference);
    }

    return null;
}

async function convertImages() {
    const imageFiles = imageRoots
        .flatMap((directory) => walk(directory))
        .filter((filePath) => rasterExtensions.has(path.extname(filePath).toLowerCase()));

    const converted = [];
    const removed = [];

    for (const filePath of imageFiles) {
        const webpPath = getWebpPath(filePath);

        if (!fs.existsSync(webpPath)) {
            await sharp(filePath)
                .rotate()
                .webp({ quality: 82, effort: 6 })
                .toFile(webpPath);
            converted.push(webpPath);
        }

        fs.unlinkSync(filePath);
        removed.push(filePath);
    }

    return { converted, removed };
}

function rewriteTextReferences() {
    const textFiles = textRoots
        .flatMap((directory) => walk(directory))
        .filter((filePath) => textExtensions.has(path.extname(filePath).toLowerCase()));

    const referencePattern = /(%PUBLIC_URL%\/[^"'`\s)]+|\/[^"'`\s)]+|(?:\.\.?\/)[^"'`\s)]+)\.(png|jpe?g|jfif)\b/gi;
    const updated = [];

    for (const filePath of textFiles) {
        const original = fs.readFileSync(filePath, "utf8");
        const next = original.replace(referencePattern, (match) => {
            const targetPath = resolveReference(match, filePath);

            if (!targetPath) return match;

            const webpPath = getWebpPath(targetPath);

            if (!fs.existsSync(webpPath)) return match;

            return match.replace(/\.(png|jpe?g|jfif)\b/i, ".webp");
        });

        if (next !== original) {
            fs.writeFileSync(filePath, next);
            updated.push(filePath);
        }
    }

    return updated;
}

(async () => {
    const { converted, removed } = await convertImages();
    const updated = rewriteTextReferences();

    console.log(JSON.stringify({
        converted: converted.length,
        removed: removed.length,
        updatedReferences: updated.length,
        sampleUpdatedFiles: updated.slice(0, 20).map((filePath) => toPosix(path.relative(root, filePath))),
    }, null, 2));
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
